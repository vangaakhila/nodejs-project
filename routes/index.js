// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()


const profiles={
    akhila:{
      username: "akhila",
      image:'/images/turbo.png',
      name: 'akhila vanga',
      company: 'f5',
      languages:['javascript','python', 'go']
    },
    nikhila:{
      username: "nikhila",
      image:'/images/turbo.png',
      name: 'nikhila vanga',
      company: 'qualcomm',
      languages:['javascript','java', 'node']
    },
    ila:{
      username: "ila",
      image:'/images/turbo.png',
      name: 'ila vanga',
      company: 'adp',
      languages:['python', 'go']
    },
}
/*  This is the home route. It renders the index.mustache page from the views directory.
  Data is rendered using the Mustache templating engine. For more
  information, view here: https://mustache.github.io/#demo */

router.post('/addprofile', (req, res) => {
  const body = req.body
  body['languages'] = req.body.languages.split(', ')
  profiles[body.username] = body
  res.redirect('/profile/'+body.username)
})

router.get('/', (req, res) => {
  res.render('index', { text: 'This is the dynamic data. Open index.js from the routes directory to see.' })
})

router.get('/query', (req,res)=>{
  const name = req.query.name
  const id = req.query.id
  const data = {
    id: id,
    name: name
  }
  res.render('profile',data)
})

router.get('/profiles', (req, res) => {
  const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
	})

	const data = {
		profiles: list,
		timestamp: req.timestamp
	}
  res.render('profiles', data)
})

router.get('/profile/:username', (req, res) => {
  const username = req.params.username
  const currentProfile = profiles[username]
  currentProfile.timestamp = req.timestamp
  if(currentProfile == null){
  res.json({
    confirmation: 'fail',
    message: "profile "+ username + " not found"
  })
  return
  }
  // res.json({
  //   confirmation: 'success',
  //   profile: currentProfile,
  // })
  res.render('profile', currentProfile)
})


// /*  This route render json data */
// router.get('/json', (req, res) => {
//   res.json({
//     confirmation: 'success',
//     app: process.env.TURBO_APP_ID,
//     data: 'this is a sample json route.'
//   })
// })

// /*  This route sends text back as plain text. */
// router.get('/send', (req, res) => {
//   res.send('This is the Send Route')
// })

// /*  This route redirects requests to Turbo360. */
// router.get('/redirect', (req, res) => {
//   res.redirect('https://www.turbo360.co/landing')
// })

module.exports = router
