# Team 578 Website

## Overview

The team has decided we want a website we can host statically or as inexpensively as possible within our existing Azure environment.

React and Next.js will provide the JavaScript framework and one or more Azure data storage services will provide the back-end.

## Actors

**Site**

The software which makes up the entirety of the website. This includes all front-end and back-end code.

**Visitor**

An individual navigating to the site. They are not authenticated or otherwise known to us.

**User**

An individual who has successfully signed up and has loggied in.

## Roles

**Anonymous**

A Visitor to the site who has not registered or authenticated yet.

**Guest**

An individual who has successfully signed up and has loggied in.

**TeamMember**

A Guest who has additional roles and has the ability to manipulate some aspects of the site.

## Features/Pages

**Home**

General information about the Team. Small list of upcoming events.

**Sign Up**

We will provide a means of signing up. This will allow users to later Login and receive notifications via email about upcoming events or other news we want to communicate.

**Login**

If a visitor has registered, they can authenticate to the website.

**Team**
Information about the Team and its history. A few paragraphs about when the team was founded, its earlier Team Number(s) and whatnot.

Maybe we also list the robots and what they did each season.

**Team Members**

Shows all current (and filtereble to past?) team members by Season. Includs the photo, name, position, responsibilities and accomplishments while on the team.

Current Season will be the default.

Clicking on a member should take the Visitor to a page for the Team Member that provides more detail and shows each Season.

**Upcoming Events**

Visitors to the site can see all upcoming events. We will list all known events from the current day forward in time. If there are a lot of events, we can implement filtering or paging but we're not likely to have a lot of events to list.

**Team Events**

We might want to have a list of upcoming Team events that won't be relevant to the casual visitor but might be important to Team Members and Care Givers. We can display these events inline with Upcoming Events but use some UI feature to differentiate them. These Team Events would only be included if a Visitor has Signed in.

**Calendar**

Shows Events in calendar.

**Team Calendar**

Shows Team Events in a calendar.
