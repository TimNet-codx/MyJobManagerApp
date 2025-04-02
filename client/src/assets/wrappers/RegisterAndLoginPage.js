import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

    @keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

  .form {
    max-width: 400px;
    border-top: 5px solid var(--red-300);
     animation: fadeInUp 0.8s ease-out;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    //color: var(--primary-200);
    color: var(--red-500);
    letter-spacing: var(--letter-spacing); 
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
