# **Grunt**

## I - installation pour l'ensemble des projets 
-----
### 1 - Installation de ruby 

**Pour rappel les commandes précédées par**
```bash
$ ma_commande_user
```

doivent être executées en tant que user (not by root)

et celles qui commencent par 

```bash
# ma_commande_root
```

sont à exécuter en tant que root ( **su** ou **sudo** )


#### 1.1 installation de rbenv 



```bash
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

#### 1.2 Installation des paquets nécessaires pour ruby 

*prend un peu de temps suivant la machine*

```bash
# apt-get install -y build-essential libssl-dev libreadline-dev zlib1g-dev
```


#### 1.3 configuration

*pour les MAC remplacer `.bashrc` par `.bash_profile`

```
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc 
$ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
$ . ~/.bashrc
```

#### 1.4 Installation de ruby

Au préalable fermer et ré ouvrir un terminal ou faire un `source ~/.bashrc`  ou `source .bash_profile` pour les macs.

```
$ rbenv install -l
```
Si pas de réponse à cette commande (liste des versions dispos), votre configuration ne fonctionne pas. Revoir les points précédents.


#### 1.5 Installer ruby 2.6.4

```
$ rbenv install 2.6.4
$ rbenv local 2.6.4
````



## II - Installation de node 
--- 

#### *sur Linux*
       
```shell
$ sudo apt install node 
```


#### *sur Mac*
  
  ```shell
$ brew install node 
  ```

## III - Installation de grunt-cli
 
Linux / Mac
```shell
$ npm install -g grunt-cli
```





## IV - Préparation d'un projet
---

À partir d'ici, ça sera à faire pour chaque projet où vous souhaitez mettre en place **grunt**

### Création du fichier de config npm

dans votre projet, il vous faut créer un fichier `package.json` avec 
```js
{
	"name": "exemple-de-projet",
    "version": "0.1.0",
    "devDependencies": {
    	"grunt": "~0.4.1"
    }
}
```

### création d'un fichier grunt 

Créer le fichier `Gruntfile.js` avec : 

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json') // mon-super-projet
    
  });

  // Load the plugin that provides the "uglify" task.
  

  // Default task(s).
  

};
```

### insatllation de base

linux ou mac
```shell
$ npm install
```

Un dossier `node_modules` et un fichier `package-lock.json` à la racine de votre projet vont être créés. 

```shell
$ ls -la
```

## V - Installation des packages
----

On va, dans notre cas, utiliser les fonctions de `minification`, `sass`, `minification des images` et de `nettoyage`

Pour ce faire il va nous falloir installer les paquets nécessaire à ces fonctions.

À chaque installation, vous aurez une ligne qui viendra s'insérer dans votre fichier `package.json` sous la forme ` "grunt-contrib-concat": "^1.0.1" `


Pour la concaténation, nous allons utliser les options de `uglify`et de `sass`, mais on aurait pu utiliser le packages `concat`

### uglify 
```shell
$ npm install grunt-contrib-uglify --save-dev
```

### sass
```shell
$ npm install grunt-contrib-sass --save-dev
```

### clean
```shell
$ npm install grunt-contrib-clean --save-dev
```

### imagemin
```shell
$ npm install grunt-contrib-imagemin --save-dev
```

## VI - Configuration des packages 
----

Il va falloir expliquer à Grunt que nous voulons utliser ses packages et lui dire comment les utiliser.

Pour ce faire, on édite le fichier `Gruntfile.js`

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // mon-super-projet
    sass: {
      dist: {
        options: {
          style: 'compressed', // Can be nested, compact, compressed, expanded.
          compass: false
        },
        files: { 
          'assets/css/style.min.css': 'assets/src/css/style.scss',
          'assets/css/special.min.css': 'assets/src/css/special.scss'
        }
      }
	  },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['assets/src/js/libs/*.js', 'assets/src/js/*.js'],
        dest: 'assets/js/script.min.js'
      }
    },
    imagemin: {
      dynamic: {
          files: [{
              expand: true,
              cwd: 'assets/src/images/',
              src: ['**/*.{png,jpg,gif}'],
              dest: 'assets/images/'
          }]
      }
    },
    clean: ['assets/js', 'assets/css']
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'sass', 'uglify', 'imagemin']);

};
```

## VII - Préparation des dossiers / fichiers
----

La configuration actuelle nous donne que l'on va utliser un répertoire `assets` avec des sous dossiers `js`, `css`, `images` et un sous dossiers avec nos sources `src` avec là aussi les sous dossiers `js`, `css`, `images`.

```shell
$ mkdir -p assets/{src,}/{js,css,images}
$ mkdir -p assets/src/js/libs
$ mkdir -p assets/src/css/partials
$ touch assets/src/css/{style.scss,special.scss}
$ touch assets/src/css/partials/_var.scss
$ touch assets/src/js/script.js
$ touch assets/src/js/libs/ma-lib.js
```

## VIII - Documentation : 
---
* node : https://nodejs.org/en/
* grunt : https://gruntjs.com
* sass: https://sass-lang.com
* contrib-sass: https://github.com/gruntjs/grunt-contrib-sass
* contrib-uglify : https://github.com/gruntjs/grunt-contrib-uglify
* contrib-clean : https://github.com/gruntjs/grunt-contrib-clean
* contrib-imagemin :  https://github.com/gruntjs/grunt-contrib-imagemin
  