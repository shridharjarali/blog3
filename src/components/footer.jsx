import React from 'react'

function Footer() {
    return (
        <>
            <div className='flex justify-between mb-0 bg-white w-full mt-10 mx-0 bottom-0 left-0 py-10 px-30 border border-t-gray-500'>
                <div>
                        <img src="https://cdn.pixabay.com/photo/2017/05/17/15/20/kids-2321161_1280.png" alt="logo"
                        className='h-8 w-8 object-cover center'
                        />
                </div>
                <div className='flex flex-row gap-10 '>
                    <div className="flex flex-col justify-start">
                        <h1 className='font-bold'>Resources</h1>
                        <a href="/">Home</a>
                        <a href="/">About</a>
                        <a href="/">contact</a>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className='font-bold'>Follow us</h1>
                        <p>Github</p>
                        <p>linked in</p>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className='font-bold'>Legal</h1>
                        <p>Privacy policy</p>
                        <p>Terms & condition</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
