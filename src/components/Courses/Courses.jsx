import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CourseCard } from './components/CourseCard';
import { Container } from '../../common/Container';
import { Button } from '../../common/Button';
import { SearchBar } from './components/SearchBar';
import { selectUser } from '../../store/user/selectors';
import { fetchCourses } from '../../store/courses/thunk';
import { fetchAuthors } from '../../store/authors/thunk';
import { selectCoursesBySearchQuery } from '../../store/courses/selectors';
import noResults from '../../assets/img/no-results.png';
import {
	ADD_NEW_COURSE_BTN,
	COURSES_NO_RESULTS_TEXT,
	NO_RESULTS_ALTERNATIVE_TEXT,
	ROLES,
	ROUTES,
} from '../../constants';

import {
	CoursesHeader,
	CoursesList,
	CoursesMessage,
	CoursesStyled,
	LoaderStyled,
} from './Courses.styled';

const Courses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initDataFetched = useRef(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { role } = useSelector(selectUser);
	const isAdmin = role === ROLES.ADMIN;

	const courses = useSelector((state) =>
		selectCoursesBySearchQuery(state, searchQuery)
	);

	const shouldRenderCourses = !isLoading && courses.length > 0;

	const shouldRenderMsg = !isLoading && courses.length === 0;

	useEffect(() => {
		if (initDataFetched.current) return;
		initDataFetched.current = true;

		(async () => {
			setIsLoading(true);

			await dispatch(fetchAuthors());
			await dispatch(fetchCourses());

			setIsLoading(false);
		})();
	}, [dispatch]);

	return (
		<CoursesStyled>
			<Container>
				<CoursesHeader>
					<SearchBar onSubmit={setSearchQuery} />
					{isAdmin && (
						<Button
							type={ADD_NEW_COURSE_BTN.type}
							text={ADD_NEW_COURSE_BTN.text}
							onClick={() => {
								navigate(ROUTES.CREATE_COURSE);
							}}
						/>
					)}
				</CoursesHeader>
				{isLoading && <LoaderStyled />}
				{shouldRenderCourses && (
					<CoursesList>
						{courses.map((item) => (
							<li key={item.id} data-testid='course-card'>
								<CourseCard {...item} />
							</li>
						))}
					</CoursesList>
				)}
				{shouldRenderMsg && (
					<CoursesMessage>
						<p>{COURSES_NO_RESULTS_TEXT}</p>
						<img
							src={noResults}
							alt={NO_RESULTS_ALTERNATIVE_TEXT}
							width={300}
						/>
					</CoursesMessage>
				)}
			</Container>
		</CoursesStyled>
	);
};

export default Courses;
