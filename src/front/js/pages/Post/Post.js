import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Post = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (
		<div classNameName="container">
			<h2>Post</h2>
			<h3>PostNewContent</h3>
			<form>
				<div className="mb-5">
					<div class="mb-3">
						<label for="exampleInputEmail1" className="form-label">Title</label>
						<input type="text" className="form-control" id="" aria-describedby="" />
						<br/>
						<label for="formFile" class="form-label">Add Picture</label>
						<input class="form-control" type="file" id="formFile" />
					</div>

					<br />
					<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
				</div>


				<button type="submit" className="btn btn-primary">Post</button>
			</form>
		</div>
	);
};
