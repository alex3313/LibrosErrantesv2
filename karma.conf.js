module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Configuration options for Jasmine can be added here if needed
      },
      clearContext: false // Keep Jasmine Spec Runner output visible in the browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // Suppress redundant output in the Jasmine HTML reporter
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/your-project-name'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    files: [
      // Include all spec files and definition files in the src directory and its subdirectories
      'src/**/*.spec.ts',
      'src/**/*.d.ts'
    ]
  });
};
