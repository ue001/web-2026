/* CHAPTER — AI Companion. Text from Jihae_Cha_Portfolio_2.pdf.
   Field reference: content/05-line0.js
   Key capitalisation follows the index tile: media/AI-companion.mp4

   Media
     hero     media/AI-companion.mp4
     figures  media/04-ai-companion/…   (two clips, seven images, names as on disk)

   No figure declares `ratio`. These are app screens, research boards and
   a wide flow diagram — cropping any of them to a fixed box would cut
   the content off, so each plate takes its file's own shape.

   `tight:true` on a section closes the gap between its plates. Used on
   the runs that read as one sequence rather than as separate figures.
*/
window.CHAPTERS['media/AI-companion.mp4'] = {
  numeral:'IV',
  file:null,   /* opens in the index overlay; only the protected projects have pages */
  head:'AI Companion, Impulse Spending\u00a0Coach',
  title:'AI Companion',
  year:'2025',
  context:'Team of three',
  lede:'An AI companion for the seconds before an impulse purchase.',
  role:'UX research, UX/UI design, Prototyping',
  tools:'Figma, custom-prompted GPT (for testing)',
  sections:[

    {name:'Context', tight:true, body:[
      'An AI companion that steps in during the seconds before an impulse purchase.'
    ], more:[
      'Impulse buying is a habit loop, not a one-time decision. The companion notices when someone lingers in a shopping app and opens a conversation before checkout, then turns what happens next into reflection that builds healthier habits over time.',
      'Working through the Double Diamond, our team of three set one objective: help people resist impulse purchases in the moment, and build healthier spending habits over time.'
    ], figures:[
      {src:'media/04-ai-companion/01-screen.mp4'},
      {src:'media/04-ai-companion/02-screen.mp4'},
      {src:'media/04-ai-companion/03-screens-en.jpg'}
    ]},

    {name:'Problem', body:[
      'Impulse buying happens out of habit. An outside view helps people hold back, but a friend\'s reply can\'t beat a one-click checkout.'
    ], more:[
      '85% said asking someone before buying helps, yet most bought anyway because the answer came too late. The companion is that outside view, there in the moment.'
    ], figures:[
      {src:'media/04-ai-companion/04-research.jpg'}
    ], also:[{name:'Research', body:[
      '100 surveys and five interviews showed that willpower alone doesn\'t break the loop. It needs an interruption in real time.'
    ], more:[
      'Desk research, a survey of 100 people and five in-depth interviews pointed to the same thing. When self-control is low, impulse buying happens without a second thought, and asking a friend helps but is too slow to compete with a one-click checkout.',
      'Most shopping happened in low-control moments: 58.9% opened shopping apps in bed, and 60% found products through social media.',
      'The insight was that willpower alone cannot break the loop. It needs an interruption in real time, and long-term habit building to make spending a conscious choice again.'
    ]}]},

    {name:'Concept', body:[
      'Friction at checkout and reflection afterwards, joined in one loop.'
    ], more:[
      'Affinity mapping gave two requirements: friction at the moment of checkout, and reflection that lasts beyond it. The concept joins them in one loop, real-time AI intervention in the moment, and rewards and reflection reports afterwards.',
      'A persona, Sue, 29, who scrolls shopping apps in bed after work, showed where each half belongs: a pause prompt during late-night browsing, a chat that delays checkout, then reflection and visible progress after the purchase or the win.'
    ], figures:[
      {src:'media/04-ai-companion/05-concept.jpg'}
    ]},

    {name:'System', body:[
      'Browsing, debating, reviewing. Whatever happens feeds back into the loop.'
    ], more:[
      'Three moments, browsing, debating and reviewing. A screen-time alert opens the AI chat, and whether the urge is resisted or not, the outcome feeds back into the loop.',
      'A resisted urge counts as a win only if nothing is bought until the next day, and leads to rewards and goal progress. A slip-up leads to a regret check, sent immediately, after a week and after a month, and into the reflection report. Over time the loop adjusts how strongly the app intervenes.'
    ], figures:[
      {src:'media/04-ai-companion/06-flow.jpg'}
    ]},

    {name:'Testing', body:[
      'We tested with five people who\'d recently regretted an impulse buy, mixing the prototype with a custom-prompted GPT that played the companion in real time.'
    ], more:[
      'The yes/no popup we started with felt like being told off, so we swapped it for a short chat that gives people a moment to breathe. Seeing how much they\'d spent didn\'t move anyone, but seeing how close they were to a trip or a goal did, so the report became about progress instead. And alerts only landed when they were short, specific and showed up at the right moment. Anything else got ignored.'
    ], figures:[
      {src:'media/04-ai-companion/07-user-testing.jpg'}
    ]},

    {name:'Onboarding & Intervention', tight:true, body:[
      'It starts from past regrets, then catches the risky moment and slows checkout in three steps.'
    ], more:[
      'Onboarding starts from regret. People mark past purchases they regret, and the AI maps their high-risk times, categories and apps, then suggests a goal drawn from their own spending. Goals are made concrete and personal, such as a winter trip to Sapporo funded by what late-night delivery orders cost over six months.',
      'A screen-time alert catches the high-risk moment, and the chat slows checkout in three steps: delay the purchase, reflect on the budget, then cool down by changing the subject. It speaks like a friend rather than a warning, names the urge, shows what the purchase would leave in the budget, and moves the conversation toward the goal the person actually cares about.'
    ], figures:[
      {src:'media/04-ai-companion/08-prototype-intervention.jpg'}
    ]},

    {name:'Rewards', tight:true, body:[
      'Resisted urges move the goal forward. Slip-ups show where the next temptation will hit.'
    ], more:[
      'Every outcome becomes feedback. Resisted urges earn rewards and move the goal forward, and slip-ups become a purchase history that shows when and where the next temptation is likely to hit.',
      'The monthly report reads the pattern back in plain language, for example tired, 11pm, one fashion app, so the next alert can arrive before the urge does.'
    ], figures:[
      {src:'media/04-ai-companion/09-prototype-reward.jpg'}
    ]}
  ],
  next:'media/line0.mp4'
};
