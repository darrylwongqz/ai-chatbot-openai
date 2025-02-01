import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white px-2">
      <h1 className="text-5xl font-bold mb-20">{"Darryl's AI ChatBot"}</h1>

      <div className="flex space-x-2 text-center">
        <div className="">
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-8 w-8" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">{'Explain xxx to me'}</p>
            <p className="infoText">{'Is it illegal to code in PHP?'}</p>
            <p className="infoText">{'Why is the sky blue?'}</p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-8 w-8" />
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">{'Change the OpenAI Model to use'}</p>
            <p className="infoText">{'Messages persisted in Firestore'}</p>
            <p className="infoText">{'Hot Toast notifications!'}</p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">
              {'May occasionally generate incorrect information'}
            </p>
            <p className="infoText">{'May occasionally produce bad content'}</p>
            <p className="infoText">{'OpenAPI knowledge limits applicable'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
