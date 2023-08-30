import AddComponent from "../../components/add/AddComponent";
export default function AddPage(props) {
    return (
        <>
            <AddComponent open={props.open} setOpen={props.setOpen}/>
        </>
    );
}