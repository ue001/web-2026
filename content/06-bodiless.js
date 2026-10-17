/* CHAPTER — Bodiless Spacing. Field reference: content/05-line0.js

   Media
     hero     media/bodiless.jpg          (also the key this chapter is
                                           registered under — renaming it
                                           breaks the link from the index)
     figures  media/06-bodiless-spacing/…

   Slideshows: a figure can take `slides:[…]` instead of `src`.
   No figure declares `ratio`, so each spread keeps its own proportions.

   Images in media/06-bodiless-spacing/, numbered in page order:
     01-book · 02-contents · 03-grid, 03-2-chapter, 03-3-chapter ·
     04-experiment, 04-2-experiment, 04-3-experiment · 05-digital · 06-stack
*/
window.CHAPTERS['media/bodiless.jpg'] = {
  numeral:'II',
  file:null,   /* opens in the index overlay; only the protected projects have pages */
  head:'Bodiless Spacing, Thesis',
  title:'Bodiless Spacing',
  year:'2024',
  context:'Graduation thesis, Royal Academy of Art, The Hague',
  note:'Selected for the exhibition Matter Does Matter',
  lede:'A thesis that asks how personal space, the invisible distance between oneself and others, can be materialized.',
  top:[
    {name:'My role',         body:'I researched and wrote the thesis, ran experiments in physical and digital space, and designed the book. It was selected for Matter Does Matter.'},
    {name:'Key decision',    body:'Spacing itself is the medium. The distance between letters, lines and elements lets the book perform the distance it describes.'}
  ],
  bottom:[
    {name:'What I learned',  body:'A static page can still move. Rhythm and spacing are a kind of motion design.'},
    {name:'What\u2019s next', body:'This research became the foundation for Line 0, and I want to keep exploring personal space in interactive form.'}
  ],
  role:'Editorial design, Writing',
  tools:'InDesign, Photoshop',
  sections:[

    {name:'Context', body:[
      'Living across cultures brought a closer look at how differently people space themselves.'
    ], more:[
      'Some keep their distance, others step closer out of comfort, in everyday life and in shared, limited spaces like a crowded subway. That invisible yet clear boundary became the starting point. The thesis asks how personal space can be materialized, in physical space and online.'
    ], figures:[
      {src:'media/06-bodiless-spacing/01-book.jpg'}
    ]},

    {name:'Structure', body:[
      'The book moves outward, from the space around one body, to shared, limited spaces between people, and finally online.'
    ], more:[
      'It opens with Entering and closes with Leaving, with chapters named as movements: Forward, Closer, Further, Intruding, Escaping, On, Off.'
    ], figures:[
      {src:'media/06-bodiless-spacing/02-contents.jpg'}
    ]},

    {name:'Spacing', body:[
      'The distance between letters gives the static page a sense of motion.'
    ], more:[
      'Letters, lines and elements are stretched, compressed and pulled apart, like bodies approaching and withdrawing.'
    ], figures:[
      {slides:[
        'media/06-bodiless-spacing/03-grid.jpg',
        'media/06-bodiless-spacing/03-2-chapter.jpg',
        'media/06-bodiless-spacing/03-3-chapter.jpg'
      ]}
    ]},

    {name:'Experiments', body:[
      'Six experiments test the boundary instead of describing it.'
    ], more:[
      'From measuring physical distance to entering someone else\u2019s space through a screen. Each opens on a black spread that states its question and hypothesis.'
    ], figures:[
      {slides:[
        'media/06-bodiless-spacing/04-experiment.jpg',
        'media/06-bodiless-spacing/04-2-experiment.jpg',
        'media/06-bodiless-spacing/04-3-experiment.jpg'
      ]}
    ]},

    {name:'Digital space', body:[
      'Digital personal space, where there is no physical distance, yet intrusion can still happen.'
    ], more:[
      'Notifications, read receipts and shared documents cross a boundary nobody can see. The final chapter proposes a definition of digital personal space.'
    ], figures:[
      {src:'media/06-bodiless-spacing/05-digital.jpg'}
    ]},

    {name:'Object', body:[
      'Printed and bound by hand.'
    ], more:[
      'A bookmark with a QR code links the printed pages to their digital experiments.'
    ], figures:[
      {src:'media/06-bodiless-spacing/06-stack.jpg'}
    ]}
  ],
  next:'media/monell.mp4'
};
