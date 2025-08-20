type Role = "React Developer" | "UI Designer" | "Backend Engineer" | "Project Manager" | "QA Tester" | "DevOps Engineer";

type ProfileCardProps = {
    name: string;
    role: Role;
    image: string;
}


function ProfileCard({name, role, image}:ProfileCardProps){

    return(
        <div className="profile-card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{role}</p>
            <button>Contact Me</button>
        </div>
    );
}

export default ProfileCard;