import { Route, Switch } from "react-router-dom";
import { Chat } from "./Components/Chat";
import { ChatHome } from "./Components/ChatHome";
import "./App.css"

export default function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <ChatHome />
            </Route>
            <Route path="/chat" exact>
                <Chat />
            </Route>
        </Switch>
    )
}