/* CHAPTER — Generative Title Slide. Field reference: content/05-line0.js
   Figure paths match the slides of generative_title_slide.pdf — export
   each slide under these names, or change the paths. */
window.CHAPTERS['media/generative.mp4'] = {
  numeral:'VII',
  file:'sub-07-generative.html',
  locked:true,   /* asks for the password: see subpage/lock.js */
  head:'Generative Title Slide, CLEVER°FRANKE',
  title:'Generative Title Slide',
  year:'2026',
  context:'Internship, CLEVER°FRANKE',
  lede:'A title slide that draws itself from the data behind it.',
  role:'Generative design, System design, Motion design',
  tools:'Figma Motion, JavaScript / HTML Canvas (built with Claude Code)',
  sections:[

    {name:'Context', body:[
      'CLEVER°FRANKE\u2019s identity is black and white, so client work stays in front and colour only ever comes from the projects themselves. Title slides had no consistent approach: some used project images, some stayed black and white, and none felt fully part of the brand.'
    ], more:[
      'The brief was to expand the colored treemap into a bigger role in the identity and to build a generative system that gives every deck its own title slide. It had to be simple enough for anyone in the studio to use, from designers to HR, produce at least three options per deck, and include motion for decks shared digitally.'
    ], figures:[
      {src:'media/01-generative-title-slide/01-output.jpg'}
    ]},

    {name:'Approach', body:[
      'Instead of adding a new element, I extended the one already there. The treemap was already on the website, in videos and on social media, always built from colours extracted from project images.'
    ], more:[
      'I kept the two things that made it recognisable, the treemap and the colour extraction, and asked three questions of it: how the treemap could take more forms, how motion could create variation, and how colour could live beyond the treemap. Explorations ran across shapes, gradients, image crops and subdivisions before narrowing to one system.'
    ], figures:[
      {src:'media/01-generative-title-slide/02-keep-expand.jpg'},
      {src:'media/01-generative-title-slide/03-explorations.jpg'}
    ]},

    {name:'System', body:[
      'The deck\u2019s images set the colours, and its use case sets the form and the motion. Two questions place every deck: is it for a client, and is it shown inside the studio or outside it?'
    ], more:[
      'Client decks use the treemap, where each colour takes as much of the frame as it covers in the photograph. Non-client decks lay the extracted colours over the image as a mosaic. External decks vary in motion intensity, and internal decks vary in motion type.'
    ], figures:[
      {src:'media/01-generative-title-slide/04-system.jpg'}
    ]},

    {name:'Parameters', body:[
      'Three sliders turn a use case into a slide: calm to wild sets how divided the frame is, colour to black and white sets how much branding shows, and abstract to literal sets how much of the original image remains.'
    ], more:[
      'Each use case is a preset position on the three sliders. The same photograph becomes a soft treemap for an external client deck and a heavily divided mosaic for an internal one, without anyone choosing colours by hand.'
    ], figures:[
      {src:'media/01-generative-title-slide/05-use-cases.jpg'}
    ]},

    {name:'Generator', body:[
      'I built the generator as a browser tool. Anyone can drop in a project image, choose a motion, and export a title slide, still or moving.'
    ], more:[
      'Behind the presets, the controls go further: the number of colours and cells, the gutter, how colours are extracted, pinning a colour picked from the image, and the motion itself, from a simple rise to a ragged reveal, with duration, stagger and order. A new seed gives a new variation, and each one exports as PNG, SVG or a recorded loop.'
    ], figures:[
      {src:'media/01-generative-title-slide/06-tool.mp4'}
    ]},

    {name:'In use', body:[
      'The same system scales from a conference stage to a meeting-room screen, branded each time and different each time.'
    ], more:[
      'Testing with the team pointed to what comes next: more room to adjust the title area, fewer cell divisions and a tighter colour range on request, choosing a still frame from the motion for PDF decks, and pulling the title from the deck itself so the whole presentation can be branded from one image.'
    ], figures:[
      {src:'media/01-generative-title-slide/07-conference.mp4'},
      {src:'media/01-generative-title-slide/08-client-meeting.mp4', w:'56%', align:'center'}
    ]}
  ],
  next:'media/line0.mp4'
};
