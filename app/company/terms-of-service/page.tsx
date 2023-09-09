import termsOfService from '@/i18n/en/terms-of-service.json';
import { ServicesC } from './ServicesC';

const TermsOfService = () => {
  return (
    <section className="max-w-xl mx-auto">
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">
          {termsOfService.header.title}
        </h1>
        <p className="mb-6">{termsOfService.header.content}</p>
        <div className="my-1">
          <ServicesC
            title={termsOfService.useOfWebsite.title}
            liContent={termsOfService.useOfWebsite.content}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.productInformation.title}
            liContent={termsOfService.productInformation.content}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.placingOrders.title}
            liContent={termsOfService.placingOrders.content}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.paymentAndShipping.title}
            liContent={termsOfService.paymentAndShipping.content}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.returnsAndRefunds.title}
            liContent={termsOfService.returnsAndRefunds.content}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.intellectualProperty.title}
            liContent={[termsOfService.intellectualProperty.content]}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.limitationOfLiability.title}
            liContent={termsOfService.limitationOfLiability.content}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.privacy.title}
            liContent={[termsOfService.privacy.content]}
          />
        </div>
        <div className="my-1">
          <ServicesC
            title={termsOfService.contactUs.title}
            liContent={[termsOfService.contactUs.content]}
          />
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
