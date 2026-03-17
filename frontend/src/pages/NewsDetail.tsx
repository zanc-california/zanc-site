import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample news items - in a real application, this would come from an API or database
  const newsItems = [
    {
      id: '1',
      title: 'Annual ZANC Gala Dinner Announced',
      date: 'June 15, 2025',
      content: `
        <p>The Association of Zambians in California (ZANC) is excited to announce our annual gala dinner, which will take place on October 15, 2025, at the Grand California Hotel in San Francisco.</p>
        
        <p>This prestigious event brings together members of the Zambian community in California to celebrate our cultural heritage and recognize outstanding contributions to our community. The evening will feature traditional Zambian music, dance performances, and a special keynote address from a distinguished Zambian diplomat.</p>
        
        <p>Tickets for the gala dinner are now available for purchase. Early bird pricing is in effect until August 31, 2025. ZANC members receive a special discount. Formal attire is required for this black-tie event.</p>
        
        <p>In addition to the dinner and entertainment, the gala will include our annual awards ceremony, recognizing individuals who have made significant contributions to the Zambian community in California and to development projects in Zambia.</p>
        
        <p>We look forward to seeing you at this celebration of Zambian culture and community achievement!</p>
      `,
      imageUrl: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '2',
      title: 'Cultural Workshop Series',
      date: 'May 30, 2025',
      content: `
        <p>ZANC is proud to announce a new series of cultural workshops focused on preserving and sharing Zambian traditions with our community in California. The workshops will begin in July 2025 and continue monthly throughout the year.</p>
        
        <p>Each workshop will focus on a different aspect of Zambian culture, including traditional music, dance, cuisine, and crafts. Participants will have the opportunity to learn directly from cultural experts and gain hands-on experience with Zambian cultural expressions.</p>
        
        <p>The workshop schedule is as follows:</p>
        <ul>
          <li>July 15: Traditional Zambian Music - Learn about and play traditional instruments</li>
          <li>August 12: Zambian Dance - Introduction to regional dance styles</li>
          <li>September 9: Zambian Cuisine - Cooking demonstration and tasting</li>
          <li>October 14: Traditional Crafts - Basket weaving and beadwork</li>
        </ul>
        
        <p>Workshops are open to all ages and experience levels. ZANC members receive priority registration and discounted fees. Non-members are also welcome to participate.</p>
        
        <p>Registration for the workshop series opens on June 15, 2025. Space is limited, so early registration is encouraged.</p>
      `,
      imageUrl: 'https://images.pexels.com/photos/8038906/pexels-photo-8038906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '3',
      title: 'Scholarship Program Applications Open',
      date: 'May 20, 2025',
      content: `
        <p>ZANC is now accepting applications for our annual scholarship program. The program aims to support Zambian students in California pursuing higher education in various fields.</p>
        
        <p>This year, we will award scholarships in the following categories:</p>
        <ul>
          <li>Undergraduate Studies (2 scholarships of $2,000 each)</li>
          <li>Graduate Studies (1 scholarship of $3,000)</li>
          <li>Vocational Training (1 scholarship of $1,500)</li>
        </ul>
        
        <p>Eligibility requirements include:</p>
        <ul>
          <li>Zambian citizenship or heritage</li>
          <li>Residence in California</li>
          <li>Enrollment or acceptance in an accredited educational institution</li>
          <li>Demonstrated academic achievement (minimum GPA of 3.0)</li>
          <li>Financial need</li>
        </ul>
        
        <p>The application deadline is July 31, 2025. Scholarship recipients will be announced at the Annual ZANC Gala Dinner in October.</p>
        
        <p>For application materials and detailed instructions, please download the scholarship application form from our website or contact the ZANC Education Committee.</p>
      `,
      imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '4',
      title: 'Community Outreach Initiative Launches',
      date: 'May 10, 2025',
      content: `
        <p>ZANC is proud to announce a new community outreach initiative aimed at supporting vulnerable communities in Zambia. The program will focus on providing educational resources and healthcare support to rural areas.</p>
        
        <p>This initiative builds on our previous outreach efforts and represents an expanded commitment to giving back to communities in Zambia. The program has two main components:</p>
        
        <p><strong>Educational Support:</strong> We will be collecting and shipping textbooks, school supplies, and educational materials to schools in rural Zambia. Additionally, we will fund small infrastructure improvements such as classroom repairs and solar lighting systems.</p>
        
        <p><strong>Healthcare Support:</strong> Working with healthcare professionals in our community, we will organize the collection and shipment of medical supplies to rural health centers. We will also provide funding for specific health initiatives, including maternal health and child nutrition programs.</p>
        
        <p>ZANC members can contribute to this initiative through donations of materials, financial contributions, or volunteer time. We will be organizing collection drives throughout the year, with the first one scheduled for June 20-21, 2025.</p>
        
        <p>For more information on how to contribute or get involved, please contact our Community Outreach Committee.</p>
      `,
      imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '5',
      title: 'Independence Day Celebration Planning Underway',
      date: 'April 25, 2025',
      content: `
        <p>Planning has begun for our annual Zambian Independence Day celebration, which will take place on October 24, 2025, at Golden Gate Park in San Francisco.</p>
        
        <p>This year's event promises to be bigger and better than ever, with traditional food, music, and activities for all ages. The celebration will run from 11:00 AM to 6:00 PM and will include:</p>
        
        <ul>
          <li>Traditional Zambian cuisine</li>
          <li>Live music and dance performances</li>
          <li>Cultural displays and exhibitions</li>
          <li>Children's activities and games</li>
          <li>Craft vendors and artisans</li>
          <li>Community recognition awards</li>
        </ul>
        
        <p>We are currently seeking volunteers to help with various aspects of the event, including setup, food preparation, children's activities, and cleanup. If you are interested in volunteering, please sign up through our website or contact the Event Planning Committee.</p>
        
        <p>This event is open to all members of the community, not just ZANC members. It's a wonderful opportunity to share Zambian culture with friends and neighbors and to celebrate Zambia's independence with the broader California community.</p>
        
        <p>Mark your calendars now for this exciting celebration!</p>
      `,
      imageUrl: 'https://images.pexels.com/photos/5794559/pexels-photo-5794559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '6',
      title: 'New Board Members Elected',
      date: 'April 15, 2025',
      content: `
        <p>ZANC is pleased to announce the election of three new board members who will help guide our organization's activities and initiatives for the next two years.</p>
        
        <p>Following our annual election process, the following individuals have been elected to the ZANC Board of Directors:</p>
        
        <ul>
          <li><strong>Lisa Mulenga</strong> - With a background in community organizing and non-profit management, Lisa brings valuable experience in program development and community engagement.</li>
          
          <li><strong>Robert Banda</strong> - As a financial professional, Robert will serve as our new Treasurer, overseeing the organization's finances and helping to ensure fiscal responsibility.</li>
          
          <li><strong>Grace Tembo</strong> - With expertise in marketing and communications, Grace will help enhance ZANC's outreach efforts and public presence.</li>
        </ul>
        
        <p>These new board members join our continuing board members in leading ZANC's efforts to connect the Zambian community in California and preserve our cultural heritage.</p>
        
        <p>We would also like to express our sincere gratitude to our outgoing board members for their dedicated service to ZANC and the Zambian community in California.</p>
        
        <p>The new board will be officially installed at a ceremony on May 1, 2025. All ZANC members are invited to attend this event, which will include a reception following the installation ceremony.</p>
      `,
      imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];
  
  const newsItem = newsItems.find(item => item.id === id);
  
  if (!newsItem) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">News Article Not Found</h2>
        <p className="text-gray-600 mb-6">The news article you're looking for doesn't exist or has been removed.</p>
        <Link to="/news">
          <Button variant="primary">Back to News</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader title={newsItem.title} />
      
      <article className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm text-gray-500">Published on {newsItem.date}</p>
          </div>
          
          {newsItem.imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link to="/news">
              <Button variant="outline">← Back to News</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;