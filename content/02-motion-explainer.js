/* CHAPTER — Motion Explainer. Field reference: content/05-line0.js
   Replaces the old 01-motion-explainer.js and 01-motion-explainer-.js. */
window.CHAPTERS['media/motion-explainer.mp4'] = {
  numeral:'V',
  file:'sub-05-motion-explainer.html',
  locked:true,   /* asks for the password: see subpage/lock.js */
  head:'Motion Explainer, Personalized\u00a0Search',
  title:'Motion Explainer',
  year:'2026',
  context:'Internship, CLEVER°FRANKE',
  lede:'A motion-driven entry point that replaces search.',
  role:'UX research, Motion design, Prototyping',
  tools:'Figma Motion, JavaScript (built with Claude Code)',
  sections:[

    {name:'Context', body:[
      'An internal safety platform holds over 10,000 data points, open to everyone in the company so they can learn from past incidents. Engagement was lower than expected.'
    ], more:[
      'The timeline view was built to make that volume navigable, and it does that well. The problem it solved was storage and structure, not arrival: the platform was built to hold the data, not to introduce it.'
    ], figures:[
      {src:'media/02-motion-explainer/01-timeline.jpg'}
    ]},

    {name:'Research', body:[
      'People arrive for different reasons. Some need one specific figure and leave, while others browse with no fixed target, looking for something to learn from or share with their team. The platform gave all of them the same starting point.'
    ], more:[
      'Three roles framed the work: an engineer who needs safety data tied to their process hazards, a safety specialist training new employees and interns, and a senior manager looking for ready-made content for team meetings. Technical familiarity also varied more than expected.'
    ], figures:[
      {src:'media/02-motion-explainer/02-users.jpg'}
    ]},

    {name:'Concept', body:[
      'Instead of the user going to the data, the data comes to the user. A short motion sequence shows what the archive holds, and role and recent activity select the data points before anyone searches.'
    ], more:[
      'A first-time visitor gets a sense of the platform\u2019s scale and purpose before they read or click anything, so understanding does not depend on onboarding. Because the field is filtered on arrival, gathering replaces querying, and exploring and searching become the same action.'
    ], figures:[
      {src:'media/02-motion-explainer/03-as-is-to-be.jpg'}
    ]},

    {name:'Sketches', body:[
      'I sketched three ways to show what the archive holds before anyone has to search, and took Attracting forward.'
    ], more:[
      'In Attracting, data points are pulled toward the cursor. The cluster grows as points are collected and the surrounding ring shrinks, so the motion doubles as a diagram of how much you have seen.',
      'Pathway connected related points along a route, which showed relationships but not scale. Search kept the field blurred until relevant points resolved, which still had the user going to the data.'
    ], figures:[
      {src:'media/02-motion-explainer/04-sketches.jpg'}
    ]},

    {name:'Flow', tight:true, body:[
      'The field arrives and drifts, gathers around the cursor, and fills a list on the right as points are captured, so the archive builds as you move.'
    ], more:[
      'Once collected, the cluster pushes uncollected points further away, then opens into a navigable sphere. Hovering a point highlights its entry in the list, so the motion and the content always read as one.'
    ], figures:[
      {src:'media/02-motion-explainer/05-wireframes.jpg'}
    ]},

    {name:'Prototype', tight:true, body:[
      'A working prototype puts the gathering in the user\u2019s hands: one click collects a personal set of data points, another gathers more.'
    ], more:[
      'Collected items arrive as cards grouped by category, from incidents and root-cause studies to standards and guidance, with an option to explore all data when the personal set is not enough.'
    ], figures:[
      /* the banner at the top is the iMac mockup (media/motion-explainer.mp4);
         here the designed interaction itself, full screen */
      {src:'media/02-motion-explainer/06-prototype.mp4'}
    ]}
  ],
  next:'media/slash.mp4'
};
