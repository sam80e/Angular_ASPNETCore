(function(global) {
  
  // map tells the System loader where to look for things
  var map = {
    'app':        'app', // 'dist',
    '@angular':   'lib/@angular',
    'rxjs':       'lib/rxjs',
    'tslib':      'lib'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { 
      main: 'main.js',  //main.ts is compiled from typescript to js so points to the js file
      defaultExtension: 'js',
      meta: {
        './*.js': {
          loader: 'systemjs-angular-loader.js'
        }
      }
    },
    // Used with older version and RxJS 4
    //'rxjs': { defaultExtension: 'js' },
    
    // Used with updated Angular 6/RxJS 6 version
    'rxjs': {
      'main': 'index.js',
      'defaultExtension': 'js'
    },
    'rxjs/operators': {
      'main': 'index.js',
      'defaultExtension': 'js'
    },
    'tslib':                { main: 'tslib', defaultExtension: 'js' },
    '@angular/common/http': { main: '../bundles/common-http.umd.js', defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
    function packUmd(pkgName) { //NOTES:  unified module bundle, 
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);