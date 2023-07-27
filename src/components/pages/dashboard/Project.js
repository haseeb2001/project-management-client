import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCollabs } from '../../../store/collabSlice';

export const Project = ({ projectId, name }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollabs({ projectId }));
  }, [dispatch, projectId]);

  const { data } = useSelector((state) => state.collab);

  const memberCount = data?.collabs?.reduce((accumulator, collab) => {
    if (collab?.projectId === projectId) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
  return (
    <Link
      to={`/project-board/${projectId}`}
      className='text-black no-underline'
    >
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'></Card.Subtitle>
          <Card.Text>
            <strong>Members: </strong>
            {memberCount}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
