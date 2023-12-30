'use client'

const About = () => {
    return (
        <>
        <div>
        <div className="bg-white">
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                
                <div className="lg:w-1/2">
                  <img className="rounded-xl shadow-lg mx-auto h-auto max-w-xl" src="/img/helloCake-2.png" alt="Hello Cake image"/>
                </div>
          
                
                <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-8">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    About Hello Cake
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Hello Cake is a sweet (and occasionally savory) shop that's been turning familiar treats upside down and on their heads, shaking up the dessert scene since 2008. Bon Appetit magazine called us “one of the most exciting bakeries in the country.”
                  </p>
                  <p className="mt-4 text-lg text-gray-500">
                    At Hello Cake, we believe in the transformative power of a really freakin good cookie or an outstanding piece of cake. And we consider NO occasion at all, to be a perfectly valid occasion to celebrate yourself or someone else. We hope you’ll agree.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-12">
                    About The Team
                </h1>
            </div>
    
            <div className="flex flex-wrap -mx-4 mb-8">

                <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                    <div className="h-auto bg-gray-100 p-8">
                        <h1 className="text-2xl font-bold">Intan Emadyana F.</h1>
                        <h2>Chef</h2>
                        <p className="text-gray-600">
                            We're a team that's obsessed with creating moments - menu items, recipes, a new handshake...
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-4">
                    <img className="rounded-lg object-cover h-full w-full" src="/img/chef.png" alt="Team working"/>
                </div>
            </div>
    
            <div className="flex flex-wrap -mx-4">

                <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0 order-2 md:order-1">
                    <img className="rounded-lg object-cover h-full w-full" src="/img/programmer.png"/>
                </div>

                <div className="w-full md:w-1/2 px-4 order-1 md:order-2">
                    <div className="h-auto bg-gray-100 p-8">
                        <h1 className="text-2xl font-bold">Maulana Ibrahim A.P</h1>
                        <h2>Web Developer</h2>
                        <p className="text-gray-600">
                            Whether we're swirling up soft serve at your local store, layering cakes in our kitchens...
                        </p>
                    </div>
                </div>
            </div>
    
        </div>
    </div>
        </div>  
        </>
    )
}

export default About