# yeoman-custom-sellpage


INSTALL YEOMAN AND GENERATOR
npm install -g yo
npm install -g generator-generator

CREATE A FOLDER FOR YOUR GENERATOR

RUN COMMAND IN TERMINAL IN CREATED FOLDER
yo generator 
	- name generator (I chose, bbsellpage so that at the end, the generator will be used as generator-bbsellpage)
	- provide github
	
CLONE yeoman-custom-sellpage
- copy /generators/app (and all its files) into the new generator you created
- run npm link in the root of your CREATED FOLDER

CREATE ANOTHER NEW FOLDER:
- call yo bbsellpage in terminal
- the terminal will prompt you with a project code, project name, and section ids.
