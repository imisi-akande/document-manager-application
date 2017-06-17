/* eslint-disable react/react-in-jsx-scope */

import React from 'react';
import { Modal, Button } from 'react-materialize';

const Prompt = ({ trigger, onClickFunction }) =>
  (
    <Modal
      actions={[
        <Button id="noDelete" waves="light" modal="close" flat>
          NO
        </Button>,
        <Button
          onClick={onClickFunction} waves="light" modal="close" 
          id="promptDelete" flat className="red white-text"
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
