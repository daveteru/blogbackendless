import { redirect } from "react-router";
import { useLoginStateStore } from "../stores/useLoginStateStore";

export const authLoader = () =>{
    const { user } = useLoginStateStore.getState();
    if (!user){
        return redirect("/login");
    }
    return {};
}
