/* =====================================================================
   CHAPTER — Line 0
   ---------------------------------------------------------------------
   cover      the hero image on the standalone subpage.
   key        the cover media path as it appears on the index tile.
              Renaming media/line0.mp4 breaks this silently.
   file       the standalone subpage that shows this chapter.
   numeral    I–VII, printed before the title in Continue links.
   context    optional line under the title: internship, graduation…
   note       optional line under the title: awards, exhibitions.
   head       "Name, Description" — the comma splits the two.
   title      short name on its own, used for the URL slug.
   year       printed under Year.
   lede       the statement under the title block.
   role       scope: comma list of disciplines, one item per line.
   tools      comma list, printed as one line.
   sections   one per row. name = left heading.
              body[]  always visible (hidden in Look)
              more[]  only visible in Read
              figures[] right column, top to bottom
   figure     src    path, .mp4/.mov/.webm render as looping video
              kind   'fig' lettered · 'doc' numbered · 'note' italic
              ratio  aspect box, e.g. '16 / 10'
              w      max width, e.g. '62%'
              align  'right' | 'center'
              fit    'contain' to letterbox instead of crop
              group  [] side-by-side plates in one band
              cap    caption text · credit photographer (doc only)
   next       key of the chapter the Continue link goes to.
   ===================================================================== */
window.CHAPTERS['media/line0.mp4'] = {
  numeral:'I',
  file:null,   /* opens in the index overlay; only the protected projects have pages */
  head:'Line 0, Speculative Metro',
  title:'Line 0',
  year:'2024',
  context:'Graduation project, Royal Academy of Art, The Hague',
  note:'Awarded by Pulchri Studio',
  lede:'A speculative metro environment where space is given on invisible terms.',
  role:'3D design, Motion design, Spatial design',
  tools:'Blender, After Effects, Photoshop',
  sections:[
    {name:'Context', body:[
      'Personal space is shaped by gender, identity, financial status and more, yet on public transport it is handed out by size and appearance. Line 0 builds a metro car where that allocation is made visible.'
    ], more:[
      'As someone relatively small, I have often been given less space in urban settings. Line 0 was my graduation project, a speculation on what a metro would look like if it distributed space on the grounds that actually shape it.'
    ], figures:[
      {src:'media/05-line0/02-windows.mp4', kind:'doc'},
      {src:'media/05-line0/03-doorway.mp4', kind:'fig', fit:'contain', w:'52%', align:'center'}
    ]},

    {name:'Passengers', body:[
      'Passengers are rendered as transparent volumes rather than figures: the shape of the space they occupy, not the body occupying it. Seen together, they turn the metro car into a diagram of who yields and who does not.'
    ], more:[
      'The figures shift in scale and posture, so the same seat can hold very different claims on space.'
    ], figures:[
      {src:'media/05-line0/04-inside.jpg', kind:'doc'},
      {src:'media/05-line0/05-group.jpg',  kind:'fig'}
    ]},

    {name:'Installation', body:[
      'The metro car was projected behind three windows, so viewers met it the way they meet a train: briefly, from the side, and never all at once.'
    ], more:[
      'Each window framed a different part of one continuous pass, and viewers assembled the whole from the gaps between them.',
      'Line 0 was later shown at Museumnacht Den Haag and awarded by Pulchri Studio. Voice generated with Clova AI; photography by Jihae Cha, Hyunkyung Cheon and Eric de Vries.'
    ], figures:[
      {group:[
        {src:'media/05-line0/06a-metro.jpg', kind:'doc'},
        {src:'media/05-line0/06b-seats.jpg', kind:'doc'}
      ]},
      {group:[
        {src:'media/05-line0/07a-viewer.jpg', kind:'doc'},
        {src:'media/05-line0/07b-viewer.jpg', kind:'doc'},
        {src:'media/05-line0/07c-viewer.jpg', kind:'doc'}
      ]},
      {src:'media/05-line0/08-exhibition.jpg', kind:'note'}
    ]}
  ],
  next:'media/bodiless.jpg'
};
