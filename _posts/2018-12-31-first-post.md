---
title: The development of my portofolio website
layout: post
author: Guilherme Rossato
tags: ['HTML5', 'CSS3', 'Javascript', 'Node', 'Flexbox', 'Github with Jekyll']
permalink: first-post/
language: en-us
---

Developed my own portofolio with Jekyll (static website generator) and Node (and Babel). Trying to aim for a minimalist look with some drawings to give the website a little light, at the end i'm very happy with the results.

My path to developing this started by the layout, making a few minimal drawings to experiment with the proportions, then developed it with the help of chrome's dev tools syncronised with my local file system.

Then, when I was satisfied with the result, I ported the finished static website to jekyll, a static website generator that runs on Ruby. The idea of Jekyll is to pre-build everything on a website using Liquid Templating engine, preventing duplicated code of a static website and transforming an otherwise dynamic website in a fully static website.

To avoid downloading hundreds of potential project articles (and their images), my page is built with the first, latest article I have written, then as the user scrolls other posts are loaded assyncronously from a pre-built API interface, all done thought pure, vanilla javascript.

I also spent some time optimizing my website to pass some audits, just so I can brag about the score.