module.exports = {
  apps: [
    {
      name: 'europack-server',
      script: 'npm',
      args: 'start',
      cwd: './server',
      env: {
        NODE_ENV: 'production',
        PORT: 5002
      },
      max_memory_restart: '800M',
      node_args: '--max-old-space-size=1024'
    },
    {
      name: 'europack-client',
      script: 'npm',
      args: 'start',
      cwd: './client',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      max_memory_restart: '800M',
      node_args: '--max-old-space-size=1024'
    }
  ]
};
