import BottomNav from "./bottom-nav";
import DeskNav from "./desk-nav";
import TopNav from "./top-nav";

export default async function Navbar() {
    return (
        <div>
            <TopNav />
            <DeskNav />
            <BottomNav />
        </div>
    )
}
