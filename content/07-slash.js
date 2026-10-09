/* CHAPTER — Slash. Field reference: content/05-line0.js
   Media, in media/07-slash/, names as on disk:
     01-insta-story.gif   the mark animating on an Instagram story
     02-story.jpg         the mark on an Instagram story
     03-campaign.jpg      the campaign line, phone and posters on the wall
     04-portraits.jpg     the three tilted portraits
     05-poster.jpg        the poster, outline and filled
     06-logo.mp4          the mark on black, moving
     07-crowdfunding.jpg  the crowdfunding post on the iMac
   The cover and the home tile both come from media/slash.mp4 (no
   `banner` set, so the index tile is used).
   FRAME is the shared box: the GIF sits on black inside it, and the
   poster and crowdfunding plates are cropped to it so they match.
   Change FRAME to your poster's proportions, e.g. '4 / 3'. */
var FRAME = '16 / 9';
window.CHAPTERS['media/slash.mp4'] = {
  numeral:'VI',
  file:null,
  head:'Slash, Graduation Identity',
  title:'Slash',
  year:'2024',
  context:'Graduation show, Royal Academy of Art, The Hague',
  lede:'An identity where the students become the slash.',
  role:'Identity design, Art direction, Photoshoot',
  tools:'After Effects, Photoshop',
  sections:[
    {name:'Context', body:[
      'The graduation identity for Interactive/Media/Design, a department working between the digital and the physical.'
    ], more:[
      'With design support from Minji Cha.'
    ], figures:[
      {src:'media/07-slash/01-insta-story.gif', ratio:FRAME, fit:'contain', align:'center', bg:'#000'}
    ]},
    {name:'Identity', body:[
      'The name comes from the slashes in the department\u2019s title. The identity is not the icon but the tilt, a way of looking at things from another angle, and the students carry the angle themselves.'
    ], more:[], figures:[
      {group:[
        {src:'media/07-slash/02-story.jpg'},
        {src:'media/07-slash/03-campaign.jpg'}
      ]},
      {src:'media/07-slash/04-portraits.jpg'}
    ]},
    {name:'Campaign', body:[
      'Print and screen borrow from each other. The crowdfunding campaign exceeded its budget goal.'
    ], more:[], figures:[
      {src:'media/07-slash/05-poster.jpg', ratio:FRAME},
      {src:'media/07-slash/06-logo.mp4'},
      {src:'media/07-slash/07-crowdfunding.jpg', ratio:FRAME}
    ]}
  ],
  next:'media/generative.mp4'
};
