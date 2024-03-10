import options from '../../../core/utils/vue/options'
import { logger } from '../../../utils/logger'
import { createSpawnCmd } from '../../../utils/createSpawnCmd'
import ora from 'ora';
import chalk from "chalk"
async function installDeps() {

  // No output will be shown in the console
  const cmdIgnore = createSpawnCmd(options.dest, 'ignore')

  const spinner = ora('Copying template...').start();

  const startTime: number = new Date().getTime();

  if(options.useGitInit ) {
    await cmdIgnore('git', ['init'])
  
    await cmdIgnore('git', ['add .'])
  
    await cmdIgnore('git', ['commit -m "Initialized by create-vue-next"'])
    }


  if (options.package && options.package !== 'none') {
    spinner.text = chalk.cyan(`Installing dependencies with ${options.package}. Please wait...`);

    await cmdIgnore(options.package, ['install']);
  }

  spinner.stop();

  const endTime: number = new Date().getTime()
  const usageTime: number = (endTime - startTime) / 1000

  console.log()

  logger.info(
    `Completed in ${usageTime}s`
  );

  console.log()

  logger.success('Project created successfully')

  console.log()

  logger.info(`cd ${options.name}`)

  console.log()

  if (options.package !== 'none') {
    logger.info(
      options.package === 'npm'
        ? `${options.package} run dev to start the dev server`
        : `${options.package} dev to start the dev server`
    )
  } else {
    logger.info(`npm install`)

    console.log()

    logger.info('npm run dev')
  }
}
export default installDeps