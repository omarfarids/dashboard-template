import TextInput from "@/components/TextInput"; // Adjust the import path as needed

const Settings = () => {
  // ------------ hooks -------------

  // ------------ functions ------------

  return (
    <section className="flex flex-col gap-2 items-center justify-center border-2 border-gray-300  rounded-3xl h-52 w-10/12 mx-auto ">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <form className="flex flex-row items-center gap-1 w-8/12">
        <TextInput placeholder="username" />
        <TextInput placeholder="Email Address" />
        <TextInput placeholder="Password" type="password" />
      </form>
    </section>
  );
};

export default Settings;
