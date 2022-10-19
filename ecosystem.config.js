module.exports = {
  apps: [
    {
      name: 'Lanuel',
      exec_mode: 'cluster',
      instances: '4',
      watch: false,
      script: './.output/server/index.mjs',
      node_args: '-r dotenv-expand/config',
      env: {
        PORT: 3003,
      },
    },
  ],
}
