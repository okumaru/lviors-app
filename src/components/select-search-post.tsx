import * as RadioGroup from '@radix-ui/react-radio-group';
import './select-search-post.css';

export default function ({ onChange }: { onChange: ( data: string ) => void }) {
  return <form>
  <RadioGroup.Root 
    className="flex gap-2" 
    defaultValue="name" 
    aria-label="View density"
    onValueChange={onChange}
  >
    <div className='flex items-center gap-2'>
      <RadioGroup.Item className="RadioGroupItem" value="name" id="r1">
        <RadioGroup.Indicator className="RadioGroupIndicator" />
      </RadioGroup.Item>
      <label htmlFor="r1">
        Name
      </label>
    </div>
    <div className='flex items-center gap-2'>
      <RadioGroup.Item className="RadioGroupItem" value="caption" id="r2">
        <RadioGroup.Indicator className="RadioGroupIndicator" />
      </RadioGroup.Item>
      <label htmlFor="r2">
        Caption
      </label>
    </div>
    <div className='flex items-center gap-2'>
      <RadioGroup.Item className="RadioGroupItem" value="tags" id="r3">
        <RadioGroup.Indicator className="RadioGroupIndicator" />
      </RadioGroup.Item>
      <label htmlFor="r3">
        Tag
      </label>
    </div>
  </RadioGroup.Root>
</form>
};
