export const SITE_REPO_URL = 'https://github.com/batalovmv/l5r-project-site'

export const ACCESS_REQUEST_URL =
  'https://github.com/batalovmv/l5r-project-site/issues/new?title=' +
  encodeURIComponent('Request access to private backend repository') +
  '&body=' +
  encodeURIComponent(
    [
      'Hi!',
      '',
      'GitHub username: <your-username>',
      'Reason / context: <why you need access>',
      '',
      'Requested scope: read-only (code + docs)',
    ].join('\n')
  )

