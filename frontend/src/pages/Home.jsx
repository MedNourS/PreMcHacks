import { useNavigate } from "react-router-dom"

function Home(){
    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`/${e.target.name}`)
    }

    return(
        <div className="w-screen h-screen flex justify-center items-center bg-[url(../../public/Wave.svg)] bg-cover">
            <div className="w-[500px] p-18 flex flex-col text-center shadow-2xl/60 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800">
                <h1 className="font-Domine text-6xl text-neutral-100">TimeFrame</h1>

                <p className="mb-12 font-Sans text-xl text-neutral-400">modern solution to old schedules</p>

                <button 
                  className="p-2 mb-12 font-Sans text-xl font-semibold text-neutral-100 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 transition hover:from-blue-400 hover:to-blue-500"
                  name="signup"
                  onClick={handleClick}
                >Create an account</button>
                <button 
                  className="mb-12 font-Sans text-xl shadow-lg text-blue-300 rounded-lg bg-neutral-900 transition hover:bg-neutral-800"
                  name="login"
                  onClick={handleClick}
                >Login</button>
                <button 
                  className="p-2 w-fit mx-auto font-Sans text-lg text-blue-300 rounded-lg transition hover:bg-neutral-800"
                  
                >Français</button>
            </div>
        </div>
    );
}

export default Home