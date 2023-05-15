import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ChoosingColorBox, {
  PickedColorInformationBox,
} from '@/components/UserPanelElements/ChoosingColor/ChoosingColor.style';
import patrickGif from '@/assets/gifs/sleeping-patrick.gif';
import wakeUpGif from '@/assets/gifs/server-ready.gif';
import { ClipLoader } from 'react-spinners';

const MySwal = withReactContent(Swal);

export function alertForSleepingServer(color) {
  MySwal.fire({
    title: 'Server is sleeping...',
    allowOutsideClick: false,
    html: (
      <div style={{ display: 'grid', gap: '25px', paddingBottom: '25px', justifyItems: 'center' }}>
        <p>We are waking up Patrick, please wait a second(Due to free hosting it could take to 30 seconds).</p>
        <img
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          src={patrickGif}
          alt="sleeping patrick cartoon character"
        />
        <ClipLoader color={color} />
      </div>
    ),
    showConfirmButton: false,
  });
}

export function alertForServerAwake() {
  MySwal.fire({
    title: 'Server is working!',
    allowOutsideClick: true,
    showConfirmButton: true,
    timer: 3000,
    html: <img src={wakeUpGif} alt="two characters waving" />,
  });
}

export function alertForErrors(errorMessage) {
  MySwal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${errorMessage !== undefined ? errorMessage : 'Something went wrong!'}`,
    showConfirmButton: false,
    timer: 2000,
  });
}

export const alertForSuccessfulAction = (message) => {
  MySwal.fire({
    icon: 'success',
    title: 'Succeed!',
    text: `${message !== undefined ? message : 'Your action was succesful!'}`,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const alertForMoneyIncorrecntess = async () => {
  let result;

  await MySwal.fire({
    icon: 'question',
    title: 'Incorrect money amount',
    text: `The amount of items are higher than overall amount. If you send data we will change your total amount to sum of items.`,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes, do it!',
    cancelButtonText: 'No, cancel',
  }).then(({ isConfirmed }) => {
    result = isConfirmed;
  });

  return result;
};

export const alertForSessionExpired = () => {
  MySwal.fire({
    icon: 'info',
    title: 'Session Expired',
    text: 'Please login again, your session expired.',
    showConfirmButton: true,
    showCancelButton: false,
  });
};

export const alertForSuccessfulAuth = (message, navigate) => {
  MySwal.fire({
    icon: 'success',
    title: 'Succeed!',
    text: `${message}`,
    showConfirmButton: false,
    timer: 3000,
  }).then(() => navigate());
};

export const alertForConfirmation = (message) => {
  return MySwal.fire({
    icon: 'info',
    title: `Are you sure ?`,
    text: message,
    showConfirmButton: true,
    showCancelButton: true,
  });
};

export const alertForPasswordRequirement = () => {
  return MySwal.fire({
    html: <h3>Enter your password</h3>,
    input: 'password',
    inputPlaceholder: 'Enter your password',
    inputAttributes: {
      maxlength: 32,
      autocapitalize: 'off',
      autocorrect: 'off',
    },
  });
};
