function UserProfile(props) {
	return (
		<section>
			<h2>{props.name}</h2>
			<p>Age: {props.age}</p>
			<p>{props.bio}</p>
		</section>
	);
}

export default UserProfile;
