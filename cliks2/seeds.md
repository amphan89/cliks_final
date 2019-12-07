

db.subscribers.insertMany( [

    { email: "john_smith@gmail.com", password: "password", user_name: "John Smith", picture: "http://www.stefantell.se/blog/wp-content/uploads/2012/10/Profoto-Telezoom-reflector-through-diffusion-headshot.jpg", academic_info: ["Web Developer", "BS Degree", "Computer Science", "SFSU"], location: ["San Francisco", "CA", "USA"], interests: ["computers", "photography", "painting", "fitness", "cars"], coolest_thing: "Cycled in the Netherlands in 2017",scores: [5, 2, 3, 4, 5, 4, 4, 1, 5, 5] }, 

    { email: "Robert_lewis@hotmail.com", password: "password", user_name: "Robert Lewis", picture: "https://s.hdnux.com/photos/76/36/03/16376043/5/920x920.jpg", academic_info: ["Teacher", "MS Degree", "History","SDSU"], location: ["San Diego", "CA", "USA"], coolest_thing: "Backpacked in Peru last year (2018)", interests: ["hr", "cooking", "cars", "photography", "painting", "reading"], scores: [3, 5, 5, 2, 3, 2, 3, 1, 5, 5] }, 

    {  email: "adam_font@gmail.com", password: "password", user_name: "Adam Font", picture: "https://blakerobinsonphotography.files.wordpress.com/2010/11/capture0063.jpg", academic_info: ["Software Engineer", "BS Degree", "Engineering", "UC Berkeley"], location: ["Berkeley", "CA", "USA"], coolest_thing: "Read Grapes of Wrath during my vacation last month (September, 2019)", interests: ["computers", "craft", "skiing", "photography", "swimming"], scores: [3, 2, 3, 4, 3, 3, 4, 1, 5, 3] }, 

    {  email: "william_oak@gmail.com", password: "password", user_name: "William Oak", picture: "https://www.professionaljeweller.com/wp-content/uploads/2015/03/links%20of%20london%20men.jpg", academic_info: ["Architect", "BA Degree", "Architecture", "Boston University"], location: ["Boston", "MA", "USA"], coolest_thing: "Surfed in Bali this during Summer vacation in 2016", interests: ["marketing", "sports", "travel", "business", "writing"], scores: [5, 4, 4, 1, 2, 4, 5, 5, 1, 1] }, 

    {  email: "omar_khalil@yahoo.com", password: "password", user_name: "Omar Khalil", picture: "http://urszulakozak.com/wp-content/uploads/2016/07/Urszula-Kozak-Portrait-Ottawa-113.jpg", academic_info: ["Lawyer", "BS Degree", "Law","Yale"], "Boston University"], location: ["Indianapolis", "IN", "USA"], coolest_thing: "Fishing trip to Alaska a couple os years ago", interests: ["business", "camping", "golfing", "fitness", "travel"], 
    scores: [3, 4, 5, 4, 3, 4, 3, 1, 5, 3] }, 

    {  email: "carolina_wallace@gmail.com", password: "password", user_name: "Carolina Wallace", picture: "https://i.pinimg.com/originals/07/3d/4c/073d4c881442c782d2cefed3e7e814f2.jpg", academic_info: ["Product Manager", "BS Degree", "Computer Sciense", "Columbia University"], location: ["New York", "NY", "USA"], coolest_thing: "Scuba diving trip to the Channel Islands in 2018", interests: ["marketing", "sports", "travel", "vlogging", "fashion"], scores: [5, 4, 4, 1, 2, 4, 5, 5, 1, 1] }, 

    {  email: "barbara_adams@yahoo.com", password: "password", user_name: "Barbara Adams", picture: "https://www.abc.net.au/news/image/11483344-3x2-700x467.jpg", academic_info: ["Sales Representative", "BS Degree", "Psychology", "University of Washington"], location: ["Seattle", "WA", "USA"], coolest_thing: "Finished my 5000 piece puzzle board", interests: ["marketing", "craft", "reading", "painting", "travel"],
    scores: [3, 5, 5, 2, 3, 2, 3, 1, 5, 5] }, 

    {  email: "julia_phillips@gmail.com", password: "password", user_name: "Julia Phillips", picture: "https://triwaynetworks.com/wp-content/uploads/2013/08/bigstock-Portrait-Of-A-Beautiful-Mature-7014470.jpg", academic_info: ["Business Analist", "BS Degree", "Business Administration", "University of Texas"], location: ["Austin", "TX", "USA"], interests: ["business", "sports", "reading", "golfing", "travel"], coolest_thing: "Learned to ride a motorcycle last recently", scores: [3, 4, 3, 4, 4, 3, 4, 1, 5, 3] }, 

    {  email: "josephine_curtis@yahoo.com", password: "password", user_name: "Josephine Curtis", picture: "https://www.ellasophiephoto.com/IMAGES/portraits/EllaSophie_OaklandWomenPortraitSpecial-ProfessionalCreative.jpg", academic_info: ["Software Developer", "BS Degree", "Engineering", "Tennessee State University"], location: ["Nashville", "TN", "USA"], coolest_thing: "Took singing classes", interests: ["Computers", "Music", "painting", "vlogging", "travel"], scores: [5, 4, 4, 4, 5, 2, 4, 1, 5, 1] }, 

    {  user_name: "Aaleyah Almasi", picture: "https://www.stu.ae/wp-content/uploads/2018/01/angled-headshot-of-businesswoman.jpg", email: "john_smith@hotmail.com", password: "password",
    academic_info: ["Program Manager","MS Degree", "Engineering", "Stanford"], location: ["Palo Alto", "CA", "USA"],
    coolest_thing: "Took a photography class", interests: ["computers", "photography", "sports", "fitness", "fashion"],
    scores: [5, 5, 5, 4, 5, 3, 4, 1, 5, 5] }, 

  ] );

########################################################################################################################

QUERY the database for users that have an interest in "business":
  
  db.subscribers.find({"interests": {$in: ["business"]}}).pretty()

