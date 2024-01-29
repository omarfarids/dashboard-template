import { useRef } from "react";
import user from "@/assets/user.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

interface AvatarProps {
  setValue: any;
  displayImages: any;
  setDisplayImages: any;
}

const Avatar = ({ setValue, displayImages, setDisplayImages }: AvatarProps) => {
  // ------------- hooks ------------
  const imageRef: any = useRef(null);

  // ------------ function --------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const display = URL.createObjectURL(fileList[0]);

    setValue(fileList[0]);
    setDisplayImages(display);
  };

  return (
    <div className="relative">
      {displayImages ? (
        <div className="avatar">
          <div className="w-28 rounded-full">
            <img src={displayImages} alt="avatar" />
          </div>
        </div>
      ) : (
        <div className="avatar">
          <div className="w-28 rounded-full">
            <img
              src={user}
              alt="avatar"
              className="rounded-full border border-gray p-3"
            />
          </div>
        </div>
      )}
      <button
        className="w-8 h-8 bottom-[15px] right-[-8px] absolute border border-gray rounded-full bg-softGray hover:shadow"
        onClick={() => imageRef.current.click()}
        type="button"
      >
        <CameraAltIcon fontSize="small" />
      </button>

      <input
        type="file"
        id="avatar"
        className="hidden"
        ref={imageRef}
        name="avatar"
        accept="image/*"
        onChange={(event: any) => {
          handleImageChange(event);
        }}
      />
    </div>
  );
};

export default Avatar;
