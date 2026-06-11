# What do we want to show or provide:

- Information about the team.
  - School district, team numbers,
  - History of the team
- Upcoming events
  - Name of event
  - Date(s) times
  - Visibility (some events are for internal use only like crockpot rodeo, workshops)
- Want to Help?
  - Names and links to sponsors
  - How to become a sponsor
  - Benefits of sponsorship (tier list)
  - Wish list
  - Types of people we'd love to have join the team (mechanical engineers, electrical engineers, programmers, AI developers, marketing, business planning, graphic design, sewing, carpentry)
- Members on the Team
  - name
  - position
  - awards and accolades
  - years on the team
  - alumni
- Robots
  - name
  - stats
  - performance
  - awards and accolades
- More
  - Source Code links
  - TBA links
  - Stabotics links
  - Outreach
  - Branding
  - Contact us
- Social links

# States

Each object which can be mutated by the site can proceed through multiple states.

- Draft
- Pending
- Rejected
- Approved
- Archived

# State Transitions

- Draft -> Draft
- Draft -> Pending
- Pending -> Rejected
- Pending -> Approved
- Approved -> Archived
- Approved -> Draft (new Draft is created an existing Approved remains visible)
