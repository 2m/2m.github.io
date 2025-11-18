---
slug: coders-start-your-ides
title: Coders, start your IDEs!
description: 'Google Summer of Code 2010 weekly reports'
authors: [2m]
tags: [gsoc]
---

Hey, today is the day when students all around the world start to officially write code and blogs for Google Summer of Code project. This also has to include me.

<!--truncate-->

I am a little bit sad to say this, but my RPMs will not be rocketing to the skies for now. I have two (yes two) exams on Friday. For now all my thoughts are with these two, and with another project work that I am doing with my course mate.

But still, I spent some time setting up my development environment. I have successfully created a fork of phpMyAdmin code in repo.or.cz for all my coding needs. When the time came to set up git in my Windows machine I ran into one little problem. It seems that puttygen does not generate private/public keys in the exact format that ssh (on msysgit) accepts. Well this little thing cost me about an hour. |:

I am still not sure what IDE to use. For hardcore PHP projects I used NetBeans. It was a long time since I worked on any huge PHP project so every time it was enough to fire up FileZilla and Notepad++. I had a couple of Java projects this year and this is why I had to start using Eclipse. Still not really sure if that is good working with phpMyAdmin.

So for now this is all the news. I will keep on doing my school chores. Next Monday I will have some serious coding blog post. See you then.

### 2010-06-04 Week #2

I have created a [wiki page](http://wiki.phpmyadmin.net/pma/Charts) where I will post all the details about the implementation. This page will let you to get an overview of how I will move towards implementing ideas.

I have also started creating placeholder files where all the fun will take place. I try to follow the file naming and coding standards, so that I do not make a mess out there.

This is the link to the [pma fork](http://repo.or.cz/w/phpmyadmin/blinky.git/shortlog/refs/heads/local) that I am working in. I believe I did not mention that earlier.

Now, when everything stands in their place, the goal for the next week is to tie in the [OFC](http://teethgrinder.co.uk/open-flash-chart-2) code into pma.

P.S. I decided to use NetBeans. It works great with PHP and it is the one that I have most experience with when developing PHP code.

### 2010-06-14 Week #3

I am finally done with travelling and all the progress that I made last week is the progress made today. As promised I implemented the Pie chart using OFC for the query statistics.

I have put the flash file which is needed for OFC into the **js/** directory. The name of the directory does not say that this is right. I believe that it should be placed into **flash/** directory, but since there is no such yet (it seems that there was no Flash in PMA until me) I will temporarily keep it there.

To embed SWF file into the page I did not use SWFObject script but rather plain and simple HTML tag. I remember when some time ago this did not work correctly throughout all the browsers, but today I have tested this on every major browser using the latest version and I didn't notice any errors.

For this week I will add Pie chart to the query profiling statistics and will start working on other types of charts using OFC.

The colours and layout are not yet final. I still have to find the best place to put javascript enabled and plain image charts.

### 2010-06-19 Week #4

there has been quite a lot of activity happening this week. First of all after some discussion I have scrapped the flash implementation of the charts. We have decided that the same chart functionality can be achieved using JS. And since JavaScript is still needed to load the data to the flash charts it does not really make much sense to have flash and JS.

This week I have implemented static image charts using pChart library. Before that I thought of implementing image charts by myself. However after stumbling upon (tm) pChart I have changed my mind. For now charts are working at the status and profiling pages. I have some code to generate charts from the query results, but I will push that and write a blog post completely on that a little bit later. These are still more or less prototypes. I do feel that it is better to try different approaches and be not afraid when deciding to go or not to go in some particular way.

Working with pChart library is quite nice. Everything is in one file hence the very easy installation. Charts look sleek and clean. The only drawback is the chart generation type. It feels that it takes extra one or two seconds to generate a chart.

During the next week I will be working on the charts for the query results. This is the most tricky part. Data is quite dynamic there and generally can be anything, thus I have to make sure to not get the user lost. More on that later...

### 2010-06-25 Week #5

This week was spent implementing charts for the query results. As mentioned in my latest blog post I implemented rendering charts for the query results in two formats.

The branch that I am working on is available [in this repository](https://demo.phpmyadmin.net/gsoc-blinky/). Unfortunately charts are broken there, even they work on my local web server. I have yet to find what is wrong.

This week was a very short week for us Lithuanians. On Thursday and Friday we have celebrated mid-summer which is a national holiday here. I will be taking the next week off because I will attend at social experiment.

I will be back to business the week after. Then I will be getting ready for JavaScript chart implementation. Can't wait! See you then!

### 2010-07-06 Week #6

As I said earlier I was away for the whole previous week. Now I am back ready for some coding action.

This week I will iron out the problems that the demo server has with the charts. I have tried to do this old-fashioned way and by now I believe that there is something to do with different GD versions. Because of this I will also add some version checking and error message generation to the code. It is always good to do this before any errors happen or you can loose some time while hunting bugs as I have.

After this I think I will be ready for JS chart implementation.

### 2010-07-11 Week #7

Quite a lot have happened this week. Let me have a peek to the commit list...

Aha. First of all I have found one serious bug that was present in the demo server. There was no GD extension installed there. Not quite a bug you may say, but it took me some hours to figure that out. So then I implemented some error checking and notification.

Besides error checking I changed the structure of some classes responsible for charts. This helped me to introduce new chart types quite easily. Now you can choose among bar, line, radar and pie charts for query results chart. I am still not quite happy with the new structure. There are some places where I would like to use multiple inheritance. But this only says that the design is not perfect.

Next week I will start the implementation of JS charts using [flot](https://code.google.com/archive/p/flot/). So for now static image chart code will stay as it is. I believe I will have to change it in some way or another because I would like to have image and JS charts looking similar, but JS charts having interactivity. I am really looking forward to this part. JS is always somewhat challenging to me. (:

### 2010-07-22 Week #8-#9

First of all sorry I missed the report of the week #7, but I was ill that week so nothing much happened. This week I have started adding JS to the charts. So this is how it went.

The PHP library that I use (pChart) for chart generation has some ImageMap functionality. What it basically does is return some data to JS where a tooltip must be shown. That data is only coordinates of two points. That script allows to show tooltips only above rectangles. Well, pie charts and radar charts consist of not only rectangles but we want tooltips on them too.

So I started this week by writing some PHP code which calculates the areas where a tooltip should be on a chart and then JS had to be improved to cope with more complicated figures. There was some interesting math involved in this. Now we have tooltips over pie and radar maps too.

Well with JS sometimes comes compatibility issues. So when I started writing JS I also have started testing my work on other browsers. Only now I have noticed that IE 8 (I haven't even tested it on older ones) does not always show base64 encoded images. Some images which have long base64 strings are not shown. This is a little show stopper because I have no idea how to fix this without scrapping base64 images.

Talking about charts (: I was thinking about and looking at flot library for charts. It is not really suitable for this. It does better job while rendering plots than charts. pChart does render really good looking charts and no other library can do it better. I am not sure if PMA needs another implementation (JS) for charts. I think now I will do my best to add some convenience JS functionality and it will be much better than completely different JS charts implementation.

Now I am going back to tinker around with details and some bugs that are still there.

BTW. You can test out the [chart functionality here](https://demo.phpmyadmin.net/gsoc-blinky/). Just go the the status page and you will see nice looking pie chart. It is harder to test query results charts because you need some data which script does understand.

### 2010-07-31 Week #10

I spent this week fixing various bugs and polishing some details. One of the more significant achievement was more sophisticated tooltip generation. Now it should work on any pie chart. Even on one with only one piece.

I have solved the base64 image length problem that I described in my last post. I decided to slice the chart image vertically into as many as 20 parts. In such way one part of a very big chart is under the limit of the base64 image length so it is displayed properly. This added some difficulties for the user when saving the chart to the hard disk. Therefore I have also added an option which allows to output a chart in one single piece.

I have tested various trivial cases for tables and checked if query results work on them. There was some tweaking to be done for these cases.

I also documented some work I have done [in the wiki](https://docs.phpmyadmin.net/en/latest/charts.html). There is also a format documented that is accepted for query results charts. You can see the preparations that need to be done for your data if you want to put it to the chart.

I have also merged master to my fork. There was only one minor conflict. This actually means that I am not changing PMA code much. I am just adding some new.

Next week I will continue polishing and fixing bugs if any.

### 2010-08-08 Week #11

Not much code was added this week. However I have tried to install my PMA fork to as many machines with as many configurations as possible. By doing so, I have found few bugs and made some fixes which will help with the compatibility.

Who would have ever thought that I would find a machine with no JSON capability. After this not usual encounter I added check for JSON functions and if there are not any, then tooltips are disabled.

Next week is the last week of GSoC and I will work on documentation, more testing and fixing bugs if any.

### 2010-08-15 Week #12

It has come to the end. This is my last GSoC 2010 weekly report. First of all I would like to say that it was an unbelievable experience to work whole summer on the open source project such as phpMyAdmin.

Well talking about my initial proposal to phpMyAdmin not everything that was written there is implemented. Two out of the three main goals are completed. Now any user can see and create charts out of their data and I believe that I did quite a good job giving future developers a way to expand chart implementation with different chart renderers.

One thing that was in my proposal and I left it out is JS chart implementation. I dropped it because image charts looked so nice and I was able to add some interactivity (tooltips) to them which are probably the most used feature of JS charts.

I spent the last week rewriting comments so that phpdoc can understand them. I also added some documentation and linked wiki to the FAQ section of the documentation. So any user that has a problem while drawing a chart can seek help there.

Well I haven't had a blog before GSoC, but I will try to keep on posting what is happening around me. See you some time later!
