/* eslint-disable react/react-in-jsx-scope */
/**
 * Renders Prompt component
 *
 * @param  {object} Modal  response on user click
 * @param  {object} Button triggers on click
 * @return {object}      reponse dispatched to reducer
 */
import React from 'react';
import { Modal, Button } from 'react-materialize';

const Prompt = ({ trigger, onClickFunction }) =>
  (
    <Modal
      actions={[
        <Button
          id="noDelete"
          waves="light"
          modal="close" flat
        >
          NO
        </Button>,
        <Button
          onClick={onClickFunction}
          waves="light"
          modal="close"
          id="promptDelete" flat
          className="red white-text"
        >
        YES
        </Button>
      ]}
      header="Are you sure you want to delete ?"
      trigger={
        trigger
      }
    />
  );

Prompt.propTypes = {
  trigger: React.PropTypes.object.isRequired,
  onClickFunction: React.PropTypes.func.isRequired
};

export default Prompt;
