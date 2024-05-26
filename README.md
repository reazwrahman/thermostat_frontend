# Project Description

Instead of creating a page for the portfolio, I have created a page from my proposed term project. As was communicated earlier via email, I am planning to build an UI for a DIY thermostat. This assignment seemed like a good starting point to start thinking about the term project.  

I have fulfilled all the requirements asked in the assignment including a flexbox, grids and the styling specifications. However, the content of the page is related to my thermostat project. 

## Backend API calls 

This assignment is intended to make 3 different API endpoint calls. First one is to the weather map api to get the current weather information. I have stubbed out the call for now, since there is a cap on how many calls I can make within the free tier. I will save those for the term project. 

The other two calls are made to a locally hosted backend api running in Python. I have not included the api with this assignment, I am hoping to include that with my final project- it's still a very much work in progress. I will add an image in the zip file showing the successful API calls when running from my local setup (```assi3_local_run.png```). 

For all of the API calls, I have included static json data, in case the call fails the static data will be retrieved from the json files.  

## General Comments 

- This page is published on Github page, just FYI: https://reazwrahman.github.io/themostat_home_page_assi3/ 

- I have tested the page on different mobile devices through chrome's dev tool. I am pretty satisfied with how it looks on both desktop and mobile. 

- All of the style requirements in the assignment are met, try doing global search in the style.css to look for something specific.

- It might be a little hard to find the attribute selector in the actual website. If you click on the logo in the navbar it will rotate to point towards the menu option - this is achieved with the attribute selector.    

    - Also, selecting any text in the grid cells will highlight them, this is done with ::selection pseudo element. 

- I will appreciate some feedback on how to organize the javascript files in the codebase. I am expecting a lot more .mjs file for the term project. It would be nice to know the industry best practices to organize these files. 

