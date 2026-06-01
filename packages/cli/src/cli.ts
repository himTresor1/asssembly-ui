import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import pc from 'picocolors'
import prompts from 'prompts'
import { getRulesTemplate } from './rules-template'

const program = new Command()

program
  .name('assembly-ui')
  .description('Interactive CLI to quickly set up and add Assembly Design System components to Next.js projects.')
  .version('0.1.0')

// Default paths & helpers
const DEFAULT_CONFIG_FILE = 'assembly.config.json'

interface Config {
  cssPath: string
  componentsDir: string
  utilsDir: string
}

async function generateAiRules(config: Config) {
  const rulesContent = getRulesTemplate(config)
  await fs.outputFile('.cursorrules', rulesContent)
  await fs.outputFile('.assembly/assembly-rules.md', rulesContent)
}

/**
 * 1. INIT COMMAND
 * Set up configuration files, directory structures, and inject assembly.css styling.
 */
program
  .command('init')
  .description('Initialize and configure the Assembly Design System variables and helpers in your project.')
  .action(async () => {
    console.log(pc.bold(pc.orange('\n🛠️  Welcome to the Assembly Design System Setup CLI!\n')))

    // Ask questions interactively
    const answers = await prompts([
      {
        type: 'text',
        name: 'cssPath',
        message: 'Where is your global CSS file located?',
        initial: 'app/globals.css'
      },
      {
        type: 'text',
        name: 'componentsDir',
        message: 'Where would you like to install your Assembly components?',
        initial: 'components/assembly'
      },
      {
        type: 'text',
        name: 'utilsDir',
        message: 'Where would you like to place your utility helper files?',
        initial: 'lib/assembly'
      },
      {
        type: 'confirm',
        name: 'generateRules',
        message: 'Would you like to generate AI Agent Rules (.cursorrules) to guide coding agents (e.g., Claude Code, Cursor, Copilot)?',
        initial: true
      }
    ])

    const config: Config = {
      cssPath: path.normalize(answers.cssPath || 'app/globals.css'),
      componentsDir: path.normalize(answers.componentsDir || 'components/assembly'),
      utilsDir: path.normalize(answers.utilsDir || 'lib/assembly')
    }

    try {
      // 1. Create Config File
      await fs.outputJson(DEFAULT_CONFIG_FILE, config, { spaces: 2 })
      console.log(pc.green(`✔ Created ${pc.bold(DEFAULT_CONFIG_FILE)} configuration successfully.`))

      // 2. Create Utilities directory and copy the standard 'cn' helper
      const cnHelperContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
      const cnPath = path.join(config.utilsDir, 'cn.ts')
      await fs.outputFile(cnPath, cnHelperContent)
      console.log(pc.green(`✔ Initialized standard utils: Created ${pc.bold(cnPath)}`))

      // 3. Inject CSS references
      const cssFullPath = path.resolve(config.cssPath)
      const cssExists = await fs.pathExists(cssFullPath)

      const cssInjection = `\n/* Assembly Design System theme injection */\n@import "@assembly/config/css/assembly.css";\n`

      if (cssExists) {
        const currentCssContent = await fs.readFile(cssFullPath, 'utf-8')
        if (!currentCssContent.includes('assembly.css')) {
          await fs.appendFile(cssFullPath, cssInjection)
          console.log(pc.green(`✔ Injected Assembly CSS import rules into ${pc.bold(config.cssPath)}`))
        } else {
          console.log(pc.yellow(`ℹ Assembly CSS import already present in ${pc.bold(config.cssPath)}`))
        }
      } else {
        await fs.outputFile(config.cssPath, `@import "tailwindcss";\n${cssInjection}`)
        console.log(pc.green(`✔ Created stylesheet file and initialized Assembly imports in ${pc.bold(config.cssPath)}`))
      }

      // 4. Generate AI Rules if requested
      if (answers.generateRules) {
        await generateAiRules(config)
        console.log(pc.green(`✔ Generated AI Agent Rules in ${pc.bold('.cursorrules')} and ${pc.bold('.assembly/assembly-rules.md')}`))
      }

      console.log(pc.bold(pc.green('\n🎉 Assembly Design System has been successfully initialized!')))
      console.log(pc.cyan(`Next steps: run ${pc.bold('npx assembly-ui add button')} to download your first component.\n`))

    } catch (error: any) {
      console.error(pc.red(`✖ Failed to initialize Assembly: ${error.message}`))
    }
  })

/**
 * 2. ADD [COMPONENT] COMMAND
 * Copies a component file from the monorepo source and rewrites its imports to match the user's config.
 */
program
  .command('add')
  .description('Download and import an Assembly component directly into your local workspace.')
  .argument('<component>', 'The name of the component to add (e.g. button, accordion, select)')
  .action(async (componentName: string) => {
    const componentLower = componentName.toLowerCase()
    
    // Check if configuration exists
    const configExists = await fs.pathExists(DEFAULT_CONFIG_FILE)
    if (!configExists) {
      console.log(pc.red(`\n✖ No configuration file found! Please run ${pc.bold('npx assembly-ui init')} first.\n`))
      return
    }

    const config: Config = await fs.readJson(DEFAULT_CONFIG_FILE)

    // Locate component in packages/ui source folder
    const uiDir = path.resolve('../../packages/ui/src/components')
    const shadcnUiDir = path.resolve('../../packages/ui/src/components/shadcn/ui')

    let sourceFile = ''
    let destFileName = `${componentLower}.tsx`

    // Try finding component in standard custom list or under shadcn/ui folder
    const standardComponentPath = path.join(uiDir, componentName, `${componentName}.tsx`)
    const indexComponentPath = path.join(uiDir, componentName, 'index.tsx')
    const shadcnComponentPath = path.join(shadcnUiDir, `${componentLower}.tsx`)

    if (await fs.pathExists(standardComponentPath)) {
      sourceFile = standardComponentPath
      destFileName = `${componentName}.tsx`
    } else if (await fs.pathExists(indexComponentPath)) {
      sourceFile = indexComponentPath
      destFileName = `${componentName}.tsx`
    } else if (await fs.pathExists(shadcnComponentPath)) {
      sourceFile = shadcnComponentPath
    } else {
      console.log(pc.red(`\n✖ Component "${pc.bold(componentName)}" not found in Assembly registry.`))
      console.log(pc.yellow(`Available components: button, accordion, alert, badge, calendar, card, select, switch, table, textarea, etc.\n`))
      return
    }

    try {
      console.log(pc.cyan(`\n📥 Fetching ${pc.bold(componentName)} component...`))

      let content = await fs.readFile(sourceFile, 'utf-8')

      // REWRITE INTERNAL MONOREPO IMPORTS dynamically to match user local directory setup!
      // Replace absolute/relative utility references like `../../lib/utils/cn` or `../../lib/utils`
      const relativeUtilRegex = /import\s+{[^}]+}\s+from\s+['"]\.\.\/\.\.\/lib\/utils\/cn['"]/g
      const generalUtilRegex = /['"]\.\.\/\.\.\/lib\/utils['"]/g
      const absoluteUtilRegex = /['"]@\/lib\/utils['"]/g

      // Determine local utility import path relative to component output folder
      const relativeDestToUtil = path.relative(config.componentsDir, config.utilsDir).replace(/\\/g, '/')
      const localUtilImport = `'${relativeDestToUtil.startsWith('.') ? relativeDestToUtil : './' + relativeDestToUtil}/cn'`

      content = content.replace(/\.\.\/\.\.\/lib\/utils\/cn/g, localUtilImport)
      content = content.replace(/\.\.\/\.\.\/lib\/utils/g, localUtilImport)
      content = content.replace(/@\/lib\/utils/g, localUtilImport)

      // Replace generic shared ui paths if components references sibling widgets
      content = content.replace(/from\s+['"]ui['"]/g, `from '@/components/assembly'`)

      // Output to configured components folder
      const destPath = path.join(config.componentsDir, destFileName)
      await fs.outputFile(destPath, content)

      console.log(pc.green(`✔ Success! Installed ${pc.bold(componentName)} to ${pc.bold(destPath)}`))
      console.log(pc.bold(pc.orange(`\n✨ Done! You can now import it directly inside your pages:`)))
      console.log(pc.cyan(`import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from '${config.componentsDir}/${destFileName.replace('.tsx', '')}'\n`))

    } catch (error: any) {
      console.error(pc.red(`✖ Failed to copy component: ${error.message}`))
    }
  })

/**
 * 3. AI RULES GENERATION COMMAND
 * Creates or overwrites the .cursorrules and .assembly/assembly-rules.md files based on assembly.config.json.
 */
program
  .command('ai')
  .description('Generate or regenerate AI Agent Rules (.cursorrules & .assembly/assembly-rules.md) for your workspace.')
  .action(async () => {
    // Check if configuration exists
    const configExists = await fs.pathExists(DEFAULT_CONFIG_FILE)
    if (!configExists) {
      console.log(pc.red(`\n✖ No configuration file found! Please run ${pc.bold('npx assembly-ui init')} first.\n`))
      return
    }

    const config: Config = await fs.readJson(DEFAULT_CONFIG_FILE)
    try {
      console.log(pc.cyan(`\n🤖 Generating AI Agent Rules...`))
      await generateAiRules(config)
      console.log(pc.green(`✔ Success! Generated AI Agent Rules in ${pc.bold('.cursorrules')} and ${pc.bold('.assembly/assembly-rules.md')}\n`))
    } catch (error: any) {
      console.error(pc.red(`✖ Failed to generate AI rules: ${error.message}`))
    }
  })

program.parse(process.argv)
