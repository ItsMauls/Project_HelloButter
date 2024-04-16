import Image from "next/image"

const PromoBanner = () => {
    
    return (
        <>
           <div className="">
        <div className="grid grid-cols-3 gap-x-8 mt-4 w-5/6 mx-auto">
            <Image width={500} height={500} className="rounded-xl" src="https://milkbarstore.com/cdn/shop/files/HomepageLeft_2.jpg?format=pjpg&v=1700526255&width=720" alt=""/>
            <Image width={500} height={500} className="rounded-xl" src="https://milkbarstore.com/cdn/shop/files/HomepageLeft_2.jpg?format=pjpg&v=1700526255&width=720" alt=""/>
            <div id="promo" className="mx-auto text-center row-span-1 mt-24">
                <h1 className="text-2xl">
                    Nikmati Promo Hari Ini!
                </h1>
                <h1 className="text-7xl py-2">
                    Promo Kue Murah
                </h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi praesentium distinctio porro minima reiciendis magnam maiores? Sunt, quisquam ea at corrupti accusantium nisi maxime ad obcaecati incidunt doloremque, quia quo.
                    Quis officiis incidunt exercitationem rerum odio rem, voluptatum delectus quisquam quasi iste repellat adipisci fuga aperiam laudantium inventore fugit sunt amet deleniti aut cumque voluptas, quidem illo. Culpa, voluptatibus ipsam?
                </p>
                <button className="mx-auto rounded-lg w-2/3 py-4 mt-4 bg-pink-500 duration-500 ease-in hover:bg-black text-white">Order Now</button>
            </div>
        </div>
    </div>
        </>
    )
}

export default PromoBanner