'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  projectcode: function() {
    // async() make sure that the function does not exit before the actual work gets completed
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'projectCode',
      message: 'Your project code (example: mhc)'
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Your project folder name (example: hammerandchisel)'
    },
    {
      type: 'input',
      name: 'projectSections',
      message: 'Your project sections with commas and no spaces (example: hero,footer,main)'
    }
    ];
    
    //Ask for user input
    this.prompt(prompts, function(answers) {

      /*set this.props up with the answers so it can be accessed from the “writing” logic.*/
      this.props = answers;

      done();
    }.bind(this));
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('prod-web-index.html'),
      this.destinationPath(this.props.projectCode + '-web-index.html'), {
          projectName: this.props.projectName,
          projectCode: this.props.projectCode,
          projectSections: this.props.projectSections.split(',')
      }
    );
    this.fs.copyTpl(
      this.templatePath('prod-web-includes.html'),
      this.destinationPath(this.props.projectCode + '-web-includes.html'), {
          projectName: this.props.projectName,
          projectCode: this.props.projectCode
      }
    );
    this.fs.copyTpl(
      this.templatePath('prod-web-scripts.html'),
      this.destinationPath(this.props.projectCode + '-web-scripts.html'), {
          projectName: this.props.projectName,
          projectCode: this.props.projectCode
      }
    );
    this.fs.copy(
      this.templatePath('prod-web-footer.html'),
      this.destinationPath(this.props.projectCode + '-web-footer.html')
    );

    this.fs.copy(
      this.templatePath('js/prod-web-index.js'),
      this.destinationPath('js/' + this.props.projectCode + '-web-index.js')
    );
    this.fs.copy(
      this.templatePath('js/prod-success-stories.json'),
      this.destinationPath('js/' + this.props.projectCode + '-success-stories.json')
    );

    this.fs.copyTpl(
      this.templatePath('css/prod-web-index.scss'),
      this.destinationPath('css/' + this.props.projectCode + '-web-index.scss'), {
          projectCode: this.props.projectCode,
          projectSections: this.props.projectSections.split(',')
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
