import { computed, Directive, Input, input, signal } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

export const alertVariants = cva(
	'relative w-full rounded-lg border border-border p-4 [&>[hlmAlertIcon]]:absolute [&>[hlmAlertIcon]]:text-foreground [&>[hlmAlertIcon]]:left-4 [&>[hlmAlertIcon]]:top-4 [&>[hlmAlertIcon]+div]:translate-y-[-3px] [&>[hlmAlertIcon]~*]:pl-7',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive:
					'text-destructive border-destructive/50 dark:border-destructive [&>[hlmAlertIcon]]:text-destructive text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);
export type AlertVariants = VariantProps<typeof alertVariants>;

@Directive({
	selector: '[hlmAlert]',
	standalone: true,
	host: {
		role: 'alert',
		'[class]': '_computedClass()',
	},
})
export class HlmAlertDirective {
	private readonly _userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() => hlm(alertVariants({ variant: this._variant() }), this._userClass()));

	private readonly _variant = signal<AlertVariants['variant']>('default');
	@Input()
	set variant(variant: AlertVariants['variant']) {
		this._variant.set(variant);
	}
}
