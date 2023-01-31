import {Button, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export default function CustomModal({
    state,
    primaryAction,
    secondaryActions,
    title,
    content,
    onClose
}) {
  const [active, setActive] = useState(state);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{height: '500px'}}>
      <Modal
        open={active}
        onClose={onClose}
        title={title}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      >
        <Modal.Section>
          <TextContainer>
                {content}
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}