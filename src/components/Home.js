import { Button } from "@material-ui/core";


function Home() {

    return (
        <main className="mainMenu">
        <Button fullWidth variant='outlined' color='primary' href="/profile"> Профиль </Button>
        <Button fullWidth variant='outlined' color='primary' href="/chat"> Чат </Button>
        </main>
    )
}

export default Home;