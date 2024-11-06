'use client';

export default function Arrows(){
    // Scroll functions
    const scrollToTop = () => {
        document.getElementById('header').scrollIntoView({ behavior: 'smooth' });
        
    };
    const scrollToDown = () => {
        document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    };
    
    return(
        <div>
            {/* Arrow to go to top */}
            <div className={`bg-[#ac3b61] hover:bg-[#50192b] cursor-pointer rounded-full p-1 fixed bottom-5 right-5 hover:shadow-hover-shadow `} onClick={scrollToTop}>
                <img src="/arrow_upward_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" className="w-[40px] h-[40px]" alt="Up Arrow" />
            </div>
            {/* Arrow to go to down */}
            <div className={`bg-[#123c69] hover:bg-[#11263c] cursor-pointer rounded-full p-1 rotate-180 fixed bottom-5 left-5 hover:shadow-hover-shadow `} onClick={scrollToDown}>
                <img src="/arrow_upward_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" className="w-[40px] h-[40px]" alt="Down Arrow" />
            </div>
        </div>
    )
}