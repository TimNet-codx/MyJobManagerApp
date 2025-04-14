import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";



const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    const [open, setOpen] = useState(false);
    
  
    return (
      <Wrapper>
        <button
          type='button'
          className='btn logout-btn'
          onClick={() => setShowLogout(!showLogout)}
        >
          {user.avatar ? (
            <img src={user.avatar} alt='avatar' className='img' />
          ) : (
            <FaUserCircle />
          )}
  
          {user?.name}
          <FaCaretDown />
        </button>
        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
          <button type='button' className='dropdown-btn' onClick={() => setOpen(true)}>
            logout
          </button>
        </div>

             {/* LogOut Dialog model  */}
                <div>
                    <Dialog
                      open={open}
                      onClose={() => setOpen(false)}
                      getPersistentElements={() => document.querySelectorAll(".Toastify")}
                      backdrop={<div className="backdrop" />}
                      className="dialog"
                    >
                      <DialogHeading className="heading">Logout Box</DialogHeading>
                       <hr/>
                      <p className="description">
                        Are you sure you want to Logout?
                      </p>
                      <div className="buttons">
                        <button type='submit' className='btn delete-btn' onClick={logoutUser}>Yes</button>
                        <DialogDismiss className="btn secondary">Cancel</DialogDismiss>
                      </div>
                    </Dialog>
                  </div>
      </Wrapper>
    );
  };
  export default LogoutContainer;