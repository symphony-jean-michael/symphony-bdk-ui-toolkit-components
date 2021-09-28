/* eslint-disable react/display-name */
import React, { useRef } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Button,
  Icon,
  Typography,
  Dropdown,
} from '../src/components';

const Template = (args) => {
  const parent = document.querySelector('div.docs-story') || document.body;
  return (
    <Modal {...args} parentNode={parent}>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const Main = Template.bind({});
Main.args = { show: true };

const header = (
  <>
    <hr />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Icon iconName={'lock'} />
      <Icon iconName={'call'} />
      <Icon iconName={'app'} />
      <Icon iconName={'bot'} />
    </div>
    <hr />
  </>
);

const body = (
  <Typography type={'body'}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Typography>
);

const footer = (
  <>
    <Button variant={'tertiary'}>Cancel</Button>
    <Button variant={'primary'}>Confirm</Button>
  </>
);

export const SmallModal: React.FC = () => {
  return (
    <Modal size="small" closeButton show>
      <ModalTitle>Small modal with header</ModalTitle>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const MediumModal: React.FC = () => {
  return (
    <Modal size="medium" closeButton show>
      <ModalTitle>Medium modal without header</ModalTitle>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const LargeModal: React.FC = () => {
  return (
    <Modal size={'large'} closeButton show>
      <ModalTitle>Large modal without header</ModalTitle>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const FullPageModal: React.FC = () => {
  return (
    <Modal size={'full-width'} closeButton show>
      <ModalTitle>Full width modal without header</ModalTitle>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export const CustomCssClassModal: React.FC = () => {
  return (
    <Modal size={'medium'} className={'myModalClass'} closeButton show>
      <ModalTitle className={'myModalTitleClass'}>Modal with additional custom CSS classes</ModalTitle>
      <ModalHeader className={'myModalHeaderClass'}>{body}</ModalHeader>
      <ModalBody className={'myModalBodyClass'}>{body}</ModalBody>
      <ModalFooter className={'myModalFooterClass'}>{footer}</ModalFooter>
    </Modal>
  );
};

export const ModalWithCloseHandler: React.FC = () => {
  const [show, setShow] = React.useState(true);
  const handleClose = () => { setShow(false) }
  return (
    <div>
      <Button onClick={() => setShow(true)}>Open the Modal</Button>
      <Modal size="medium" closeButton show={show} onClose={handleClose}>
        <ModalTitle>Medium modal with onClose prop</ModalTitle>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button variant={'tertiary'} onClick={handleClose}>Cancel</Button>
          <Button variant={'primary'} onClick={handleClose}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const ModalWithDropdown: React.FC = () => {
  const [show, setShow] = React.useState(true);
  const [menuPortalTarget, setMenuPortalTarget] = React.useState(null);
  //const modalRef = useRef(null);
  const handleClose = () => { setShow(false) }

  React.useEffect(() => {
    //console.log(modalRef);
    //setMenuPortalTarget(document.body);
    setMenuPortalTarget(document.querySelector('[data-container-id="TEST"]'));
  }, [])

  /*React.useEffect(() => {
    console.log('modalRef.current', modalRef.current);
    setMenuPortalTarget(modalRef.current);
  }, [modalRef.current])*/

  return (
    <div>
      <Button onClick={() => setShow(true)}>Open the Modal</Button>
      <Modal data-container-id={'TEST'} ref={setMenuPortalTarget} size="medium" closeButton show={show} onClose={handleClose}>
        <ModalTitle>Medium modal with onClose prop</ModalTitle>
        <ModalBody>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu volutpat odio, at facilisis mauris. Integer porttitor lobortis lorem, a dignissim eros. Nulla eget dapibus nisi. Integer quis dictum odio. Fusce id lacinia dui. Pellentesque et lacus dui. Aenean iaculis risus vel justo tempor imperdiet ut in velit. Pellentesque non elit aliquam, pellentesque lectus non, dignissim sapien. Vestibulum vitae erat ligula. Donec leo risus, auctor eget facilisis id, mattis in leo. Nam porttitor neque sit amet metus tincidunt, non interdum urna efficitur.
            Cras sit amet sollicitudin orci. Quisque convallis molestie erat vitae ultrices. Phasellus cursus consequat magna, at tempus ex ultrices et. Mauris id felis eget ante hendrerit elementum at at nisi. Donec in lectus sit amet eros tincidunt pulvinar eu vitae ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec in porta nibh. Morbi eget nunc velit. Aliquam erat volutpat. Nam et erat id augue hendrerit molestie eget vitae sem. Praesent vestibulum arcu sapien, eget maximus nibh sodales eget. Mauris quis ipsum sit amet odio iaculis gravida ut nec lorem. Mauris ut fringilla turpis, sed pharetra nisi. Nunc pulvinar risus et elit euismod, quis vehicula dui tincidunt. Integer efficitur sodales leo id rhoncus. Phasellus in volutpat magna.
            Cras sit amet sollicitudin orci. Quisque convallis molestie erat vitae ultrices. Phasellus cursus consequat magna, at tempus ex ultrices et. Mauris id felis eget ante hendrerit elementum at at nisi. Donec in lectus sit amet eros tincidunt pulvinar eu vitae ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec in porta nibh. Morbi eget nunc velit. Aliquam erat volutpat. Nam et erat id augue hendrerit molestie eget vitae sem. Praesent vestibulum arcu sapien, eget maximus nibh sodales eget. Mauris quis ipsum sit amet odio iaculis gravida ut nec lorem. Mauris ut fringilla turpis, sed pharetra nisi. Nunc pulvinar risus et elit euismod, quis vehicula dui tincidunt. Integer efficitur sodales leo id rhoncus. Phasellus in volutpat magna.</span>
          <Dropdown menuPortalStyles={(base) => ({ ...base, zIndex: 201 })} menuPortalTarget={menuPortalTarget} options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]} />
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu volutpat odio, at facilisis mauris. Integer porttitor lobortis lorem, a dignissim eros. Nulla eget dapibus nisi. Integer quis dictum odio. Fusce id lacinia dui. Pellentesque et lacus dui. Aenean iaculis risus vel justo tempor imperdiet ut in velit. Pellentesque non elit aliquam, pellentesque lectus non, dignissim sapien. Vestibulum vitae erat ligula. Donec leo risus, auctor eget facilisis id, mattis in leo. Nam porttitor neque sit amet metus tincidunt, non interdum urna efficitur.
            Cras sit amet sollicitudin orci. Quisque convallis molestie erat vitae ultrices. Phasellus cursus consequat magna, at tempus ex ultrices et. Mauris id felis eget ante hendrerit elementum at at nisi. Donec in lectus sit amet eros tincidunt pulvinar eu vitae ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec in porta nibh. Morbi eget nunc velit. Aliquam erat volutpat. Nam et erat id augue hendrerit molestie eget vitae sem. Praesent vestibulum arcu sapien, eget maximus nibh sodales eget. Mauris quis ipsum sit amet odio iaculis gravida ut nec lorem. Mauris ut fringilla turpis, sed pharetra nisi. Nunc pulvinar risus et elit euismod, quis vehicula dui tincidunt. Integer efficitur sodales leo id rhoncus. Phasellus in volutpat magna.
            Cras sit amet sollicitudin orci. Quisque convallis molestie erat vitae ultrices. Phasellus cursus consequat magna, at tempus ex ultrices et. Mauris id felis eget ante hendrerit elementum at at nisi. Donec in lectus sit amet eros tincidunt pulvinar eu vitae ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec in porta nibh. Morbi eget nunc velit. Aliquam erat volutpat. Nam et erat id augue hendrerit molestie eget vitae sem. Praesent vestibulum arcu sapien, eget maximus nibh sodales eget. Mauris quis ipsum sit amet odio iaculis gravida ut nec lorem. Mauris ut fringilla turpis, sed pharetra nisi. Nunc pulvinar risus et elit euismod, quis vehicula dui tincidunt. Integer efficitur sodales leo id rhoncus. Phasellus in volutpat magna.</span>
        </ModalBody>
        <ModalFooter>
          <Button variant={'tertiary'} onClick={handleClose}>Cancel</Button>
          <Button variant={'primary'} onClick={handleClose}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
