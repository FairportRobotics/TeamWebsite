# Team 578 Website <!-- omit in toc -->

# Revision History <!-- omit in toc -->

| Date       | Version | Description | Author(s)     |
| ---------- | ------- | ----------- | ------------- |
| 2026-03-31 | 0.1     | Initial     | Hurrell, John |

# Table of Contents <!-- omit in toc -->

- [1. Software Requirements Specification](#1-software-requirements-specification)
  - [1.1. Introduction](#11-introduction)
    - [1.1.1. Purpose](#111-purpose)
    - [1.1.2. Scope](#112-scope)
    - [1.1.3. Definitions, Acronyms and Abbreviations](#113-definitions-acronyms-and-abbreviations)
    - [1.1.4. References](#114-references)
    - [1.1.5. Overview](#115-overview)
  - [1.2. Overall Description](#12-overall-description)
  - [1.3. Current Website Overview](#13-current-website-overview)
  - [1.4. Current Website Issues](#14-current-website-issues)
- [2. Proposed Website Overview](#2-proposed-website-overview)
  - [2.0.1. Home](#201-home)
  - [2.0.2. Events](#202-events)
  - [2.0.3. Team](#203-team)
  - [2.0.4. Robots](#204-robots)
  - [2.0.5. Sponsors](#205-sponsors)
  - [2.0.6. Authentication and Authorization](#206-authentication-and-authorization)
- [3. System Requirements](#3-system-requirements)
  - [3.1. Roles](#31-roles)
    - [3.1.1. Guest](#311-guest)
    - [3.1.2. User](#312-user)
    - [3.1.3. Student](#313-student)
    - [3.1.4. Parent](#314-parent)
    - [3.1.5. Mentor](#315-mentor)
    - [3.1.6. Admin](#316-admin)
  - [3.2. Navigation Header](#32-navigation-header)
    - [3.2.1. Logo](#321-logo)
    - [3.2.2. Home](#322-home)
    - [3.2.3. Events](#323-events)
      - [3.2.3.1. Events with Pending Approval Badge](#3231-events-with-pending-approval-badge)
    - [3.2.4. Team](#324-team)
      - [3.2.4.1. Team Member with Pending Approval Badge](#3241-team-member-with-pending-approval-badge)
    - [3.2.5. Robots](#325-robots)
    - [3.2.6. Sponsors](#326-sponsors)
    - [3.2.7. Sign In](#327-sign-in)
    - [3.2.8. Sign Out](#328-sign-out)
  - [3.3. Footer](#33-footer)
  - [3.4. Home Page](#34-home-page)
  - [3.5. Events](#35-events)
    - [3.5.1. Calendar View](#351-calendar-view)
    - [3.5.2. List View](#352-list-view)
    - [3.5.3. Create](#353-create)
    - [3.5.4. Edit](#354-edit)
    - [3.5.5. Details](#355-details)
  - [3.6. Team](#36-team)
    - [3.6.1. Create](#361-create)
    - [3.6.2. Edit Self](#362-edit-self)
    - [3.6.3. Edit Other](#363-edit-other)
    - [3.6.4. Details](#364-details)
  - [3.7. Robots](#37-robots)
    - [3.7.1. Create](#371-create)
    - [3.7.2. Edit](#372-edit)
    - [3.7.3. Details](#373-details)
  - [3.8. Sponsors](#38-sponsors)
    - [3.8.1. Create](#381-create)
    - [3.8.2. Edit](#382-edit)
  - [3.9. User Administration](#39-user-administration)
    - [3.9.1. Edit](#391-edit)
    - [3.9.2. Disable](#392-disable)
    - [3.9.3. Revoke Current Sessions](#393-revoke-current-sessions)
    - [3.9.4. Impersonate](#394-impersonate)
  - [3.10. Profile](#310-profile)
- [4. Supporting Information](#4-supporting-information)

# 1. Software Requirements Specification

## 1.1. Introduction

The introduction of the Software Requirements Specification (SRS) provides an overview of the entire SRS with purpose,
scope, definitions, acronyms, abbreviations, references and overview of the SRS. The aim of this document is to gather
and analyze and give an in-depth insight of the complete **Team 578 Website** software system by defining the problem
statement in detail. Nevertheless, it also concentrates on the capabilities required by stakeholders and their needs
while defining high-level product features. The detailed requirements of the **Team 578 Website** are provided in this
document.

### 1.1.1. Purpose

The purpose of the document is to collect and analyze all assorted ideas that have come up to define the system, its
requirements with respect to consumers. Also, we shall predict and sort out how we hope this product will be used in
order to gain a better understanding of the project, outline concepts that may be developed later, and document ideas
that are being considered, but may be discarded as the product develops.

In short, the purpose of this SRS document is to provide a detailed overview of our software product, its parameters and
goals. This document describes the project's target audience and its user interface, hardware and software requirements.
It defines how our client, team and audience see the product and its functionality. Nonetheless, it helps any designer
and developer to assist in software delivery lifecycle (SDLC) processes.

### 1.1.2. Scope

TBD

### 1.1.3. Definitions, Acronyms and Abbreviations

| Term              | Definition                                                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication    | The process of proving to an application WHO you are. The Login process.                                                                                                               |
| Authorization     | The process an application uses to understand WHAT you can do. Roles and permissions.                                                                                                  |
| Database          | A software system which supports Creating, Retrieving, Updating and Deleting information. Also known as CRUD.                                                                          |
| FIRST             | For Inspiration and Recognition of Science and Technology [FIRST](https://www.firstinspires.org/) is an international youth organization that operates the FIRST Robotics Competition. |
| Register          | The act of providing name and credentials in order gain access to the website.                                                                                                         |
| The Blue Alliance | A website which aggregates FRC data from [FIRST](https://www.firstinspires.org/) and provides information and metrics about competitions and teams.                                    |
| User              | An individual who is registered and recognized by the website.                                                                                                                         |
| Guest             | An individual who is not recognized by the website.                                                                                                                                    |

### 1.1.4. References

[Team 1418](https://1418.team/team)
Team Vae Victis is the inspiration for the initial versions of the website.

[Better-Auth](https://better-auth.com/)
This is a library used to authenticate. It allows us to self-host authentication in our own database. Additionally, it supports the ability to login via social providers like Apple, Facebook, Google and others.

### 1.1.5. Overview

The remaining sections of this document provide a general description, including characteristics of the users of this
project, the product's hardware, and the functional and data requirements of the product.

Section 2 provides a general description of the website. This section provides a high-level description of what we want
the website to do.

Section 3 describes the specific requirements of the website. This section includes functional requirements, data
requirements and constraints and assumptions made while designing the website. It also provides the visitor perspective
of the website.

Section 4 discusses the external interface requirements and gives detailed descriptions on how they interact with the
website. These external interfaces are largely invisible to visitors to the site. Examples include web and database
hosts, APIs, storage and any other systems the site requires.

Section 5 is for supporting information.

## 1.2. Overall Description

This document contains the problem statements that the current Team 578 website is facing and how we plan to correct
those inadequecies.

## 1.3. Current Website Overview

The current website's navigation reveals the following tree:

- Home
- Blog
- About Us
  - Team History
  - Team Goals
  - Our Robots
  - Subteams
- Resources
  - Chalk Raiders
  - Safety
  - STEM Kit Resources
- Awards and Achievements
- Parents
  - STIMS Instructions
- Calendar
- Contact Us
- Sponsors

In addition, the site exposes widgets that expose the following:

- Twitter Feed (broken)
- Search
- Recent Posts
- Recent Comments
- Archives
- Categories
- Meta

## 1.4. Current Website Issues

**Website is years out of date**

The current website has not been updated in multiple years. Many of the images appearing on the site are over 5 years
old. News and information on the site is numerous years out of date.

**Website does not easily allow individuals to update content**

The current website is a WordPress hosted application. This is not an issue, but there is no easy means for individuals
to add, update or delete content without logging into WordPress. We would like to make this easier by self-managing
access permissions and providing a means to allow individuals to add content but hold that content for publication until
properly approved.

**Website does not compliment our team**

Due to the limited ability to update the current site and the stale nature of its content, potential members and
sponsors may be given a negative impression of our team. Visiting a site only to be presented with information that is
many years out-of-date does not inspire a feeling of confidence that the organization is worthy of respect.

# 2. Proposed Website Overview

There are five primary sections to the site which will allow us to provide a pleasant yet informative experience for
intersted visitors.

- Team Members
  - Current Students
  - Alumni
  - Mentors
- Events/Calendar
  - Calendar/list of Events
- How to Help/Sponsors
  - Sponsors
  - How do become a sponsor
  - Tier Levels
  - People needed
  - Other ways to help
- Robots/Game Years
  - Robots and thier charactieristics
- Resources
  - Branding
  - Contacts

### 2.0.1. Home

This page should be used to provide a very quick and easily parsed impression of our Team. It can include the team number, an image of
the current team members and brief history about the team

Additionally, it can emit a limited number of upcoming events and posts with links to visit pages dedicated to showing
more of those features.

### 2.0.2. Events

Events are functions that the Team will host or attend. Examples include, but are not limited to:

- Fairport Public Market Booth
- Fairport Canal Days Booth
- Fundraising Events
- Outreach Programs
- FRC Competitions
- Crock Pot Rodeo

Some events are simple notices while others have sign-up requirements for Students, Mentors and Parents.

### 2.0.3. Team

Provide the ability to display information about members of the Team. Team Members include:

- Coaches
- Mentors
- Students

Each Team Members can have properties associated with them which are available for display. Properties include, but are
not limited to:

- Image
- Name
- Role (Coach, Mentor, Student)
- Title (Head Coach, Lead Mentor, Software Mentor, Chief Engineer...)
- Email Address (@fairportrobotics.org)
- Bio
- Accolades: (2025 Deans List Nominee, 2024 XXX Winner...)
- Active From Date
- Active Through Date

By including active dates, we can filter Team Members (primarily students) to Active but provide a means for visitors to
see formerly active students so they can share their successes with schools or employers later.

### 2.0.4. Robots

Displays current and past Robots built by the Team. Properties include, but are not limited to:

- Competition Year and Title
- Image(s)
- Name
- Competitions Attended
- Awards
- Link to GitHub
- Link to CAD

### 2.0.5. Sponsors

Display a list of Sponsors with optional links to their websites.

Display a table showing Sponsorship Tiers and the benefits each Tier brings to the Sponsor.

Reinforce that no donation is too small. Event a $5 gift card is welcome and will be used as prizes for Team Members or
at Outreach Events.

Provide contact information for Sponsors to donate or to ask questions.

Provide a means of viewing the Sponsors from past seasons.

Sposnor properties include, but are not limited to:

- Season
- Name
- Link
- Logo Image
- $ Estimated (to calculate Tier)

**Stretch requirement:**

Keep this list updated and track each and every donation to the team. Include parents and the food provided to the Team.
Maybe this can be like the credits in a movie where it's a huge list that we build during the season.

### 2.0.6. Authentication and Authorization

TBD

# 3. System Requirements

TBD

## 3.1. Roles

Roles provide the ability for the System to implement access restrictions.

An authenticated individual will have one or more Roles.

### 3.1.1. Guest

A Guest is any unauthenticated visitor to the website. This Role is not assigned to a guest but represents an
absence of any other defined Role.

A Guest has limited, read-only access to the website.

### 3.1.2. User

A User is an individual who has been Authenticated by the website.

Includes all permissions granted by the Visitor Role.

Users will have the ability to update their own Profile information.

### 3.1.3. Student

The Student Role represents an individual who is currently TBD

### 3.1.4. Parent

The Parent Role represents an individual who can be associated as the Parent or Guardian of a **Student**.

### 3.1.5. Mentor

The Mentor Role represents an adult individual who is not a Student.

### 3.1.6. Admin

The Admin Role is a specialized Role defined by Better-Auth and provides the following abilities:

- Can ban other users
- Can unban users
- Can impersonate users
- Can revoke user sessions

## 3.2. Navigation Header

Site shall display a header at the top of the page with links to the primary sections of the site. Contents and
appearance of the Header may vary depending on the authentication and authorization status of the visior.

Links in the Header shall emit a distinct appearance if the current page is active. For example, if the visitor is
viewing the "Team" page, the "Team" menu item shall appear different than the other menu items.

### 3.2.1. Logo

Link takes User to the Home page.

### 3.2.2. Home

Menu item takes User to the Home page.

### 3.2.3. Events

Menu item takes User to the Events page.

#### 3.2.3.1. Events with Pending Approval Badge

For Users with the Role Coach or Mentor, display a badge adjacent to the Event link representing a count of the number
of Events which are awaiting approval.

Menu item takes User to the Events page.

### 3.2.4. Team

Menu item takes User to the Team Members page.

#### 3.2.4.1. Team Member with Pending Approval Badge

For Users with the Role Coach or Mentor, display a badge adjacent to the Team link representing a count of the number of
Team Member edits which are awaiting approval.

Menu item takes User to the Team Members page.

### 3.2.5. Robots

Menu item takes User to the Robots page.

### 3.2.6. Sponsors

Menu item takes User to the Sponsors page.

### 3.2.7. Sign In

TBD

### 3.2.8. Sign Out

TBD

## 3.3. Footer

Site shall display a footer at the bottom of the page with links to other sections of the site.

- Copyright notice
- Contact Us link
- Links to social sites

## 3.4. Home Page

TBD

## 3.5. Events

TBD

### 3.5.1. Calendar View

- Display current month calendar with Events placed into days on the calendar
- Each Event listed will include display of:
  - Event Title
  - Partial Description
- System will display a link to the the name of the past month. Clicking link will display that month and any Events
  within that month.
- System will display a link to the the name of the next month. Clicking link will display that month and any Events
  within that month.
- Display UI element to switch to List mode. Clicking on the UI element will switch to the List mode

### 3.5.2. List View

- List limited details about current and upcoming events.
- Each Event listed will include display of:
  - Event Title
  - Partial Description
- Order descending by date (most recent events are first).
- Display UI element to switch to List mode. Clicking on the UI element will switch to the List mode

### 3.5.3. Create

| Property        | Required | Description                                                                                                   |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| Title           | Yes      | Brief title describing the Event                                                                              |
| Description     | Yes      | Longer description to further describe the Event. Markdown supported.                                         |
| Audience        | Yes      | Who can view the Event. Choices are: All, Team Members, Parents/Guardians                                     |
| Start Date/Time | Yes      | Date and time when the Event begins                                                                           |
| End Date/Time   | Yes      | Date and time when the Event ends                                                                             |
| Publish         | Yes      | Default is False. When set to True, the Event will be visible to those parties meeting the Audience criteria. |

Future:

How can we show edit history of Events? It would be useful to support a change history to track when and who edited an
Event.

The system shall allow the management of:

- Title
- Description: Markdown supported text so we can include formatting and links
- Event Date
- Event Time: (e.g. 8AM-12PM, 8AM-5PM...)
- Audience: Who can see the event? Anyone visiting the site? Only registered Users? Only Team Members?
- Shits: For events which require the presence of Team Members, provide a means to specify shifts and the required
  number of Team Member types required to satisfy each shift. (e.g. 8-12 3x Studens, 8-12 2x Mentors...). Provide a
  means for authorized individuals to add/remove Team Members from shifts.
- Other requirements: Some events might require other resources or requirements like food. Provide a means for us to
  specify what items and what quantities are needed. Provide a means for authorized individuals to add/remove from
  requirements.

### 3.5.4. Edit

- Operates under two different view modes:
  - Calendar (default)
  - List
- For Coaches, Mentors: Displays all Events regardless of Approval status.
- For all other Roles, the System shall filter Events according to the Audience configured when the Event was created.
  Some Events are visible to the public, others have limited scope and the System will use Authorization rules to
  determine the appropriate visibility.
- For all view modes, clicking on an Event Title will navigate the user to the Event Details Page
- For all view modes, the System shall provide additional UI elements for Users with appropriate Authorization to:
  - Create New Event
  - Update Existing Event
  - Approve Pending Event so it can be Published and Audience will be able to view the Event.

### 3.5.5. Details

- System shall verify the User has appropriate permissions to view the Event.
- Event listed will include display of:
  - Event Title
  - Full Description
  - TBD
  - System shall provide additional UI elements for Users with appropriate Authorization to:
    - Update Event
    - Approve Pending Event so it can be Published and Audience will be able to view the Event.

## 3.6. Team

Team members shall be able to edit their own information with the following notes:

- Coaches can edit their information and changes are immediately published.
- Mentors can edit their information and changes are immediately published.
- Students can edit their bio but changes require approval before being published.
  - Coaches can approve edits to Student bios
  - Mentors can approve edits to Student bios

### 3.6.1. Create

TBD

### 3.6.2. Edit Self

TBD

### 3.6.3. Edit Other

TBD

### 3.6.4. Details

TBD

## 3.7. Robots

TBD

### 3.7.1. Create

TBD

### 3.7.2. Edit

TBD

### 3.7.3. Details

TBD

## 3.8. Sponsors

TBD

### 3.8.1. Create

TBD

### 3.8.2. Edit

TBD

## 3.9. User Administration

TBD

- Can Add Role to User
- Can Remove Role from User
- Can Confirm Parent/Student relationship
- Can Add Parent/Student relationship
- Can Remove Parent/Student relationship

### 3.9.1. Edit

TBD

### 3.9.2. Disable

TBD

### 3.9.3. Revoke Current Sessions

TBD

### 3.9.4. Impersonate

We want to support the ability for a small subset of Users to impersonate other Users to allow them the ability to test
the UI and other features of the website. This would also allow them to perform functions in the event that a User is
unable to d

Authenticated Users with the **User Admin** Role will see displayed a UI element that allows them to impersonate a user
from the list of all Users.

While impersonating a User, the UI shall display the impersonated User's details.

While impersonating a User, the UI shall display a UI element allow the impersonation to be cancelled.

## 3.10. Profile

For Authenticated Users,

- All Roles: Name
- Parent Role: I am the parent or guardian of ???.
- Student Role: I confirm that XXX is my parent or guardian.
- Phone number
- Email Address

# 4. Supporting Information

https://www.team254.com/

https://www.thebluealliance.com/

https://www.perforce.com/blog/alm/how-write-software-requirements-specification-srs-document

https://www.team3182.org/

1418 - Vae Victis
Nice site. I like the animation of the logo in the upper left when scrolling.

Sponsors section is nice. White on dark. We should do something like this where we have support for editing the following:

https://1418.team/robot/2025

- Year
- Name of robot
- Pictures (0 or more)
- Awards (0 or more)
- Brief game description. Link to game reveal.
- Section
  - Subsection
    - Header
    - Content
- Performance (how did we do at the events)

https://1418.team/team
Nice summary and bio.

https://1418.team/alumni
Nice map of where the students moved on to. Quotes from students.

https://1418.team/sponsorship
Nice page. Clean and lays out the different sponsorship levels.

Links to a downloadable PDF that describes how sponsorship helps.

https://1418.team/branding
Branding page helps nicely.

https://robotics.nasa.gov/frc-resources/
https://spectrum3847.org/recommendedreading/
